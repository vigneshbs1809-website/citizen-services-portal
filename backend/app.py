"""
Citizen Services Portal - Flask REST API Backend
================================================
Connects the 6-table normalized SQLite database (services, service_translations,
service_documents, service_eligibility, service_steps, service_sources) to REST endpoints.

Features:
- Pure public information guidance (NO authentication, NO personal data collection).
- Parameterized database queries preventing SQL injection.
- Multilingual support for 6 regional languages (en, kn, hi, te, ta, ml).
- Input validation and sanitized queries.
- Clean structured JSON responses with standard HTTP error codes.
- CORS enabled for React frontend integration.
"""

import os
import re
import hashlib
from typing import Any, Dict, Tuple
from flask import Flask, jsonify, request, Response, send_file
from flask_cors import CORS

from database import (
    init_db,
    get_categories,
    get_services,
    get_service_by_id,
    search_services,
    get_states,
    get_state_by_code,
    get_districts_by_state,
    get_state_service_portals,
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE
)

# Initialize Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for all /api/* routes
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Ensure database schema is initialized on startup
with app.app_context():
    init_db()


# =============================================================================
# INPUT VALIDATION HELPERS
# =============================================================================

# Service and category identifiers: lowercase alphanumeric with hyphens/underscores
VALID_ID_PATTERN = re.compile(r"^[a-zA-Z0-9_\-]{1,80}$")


def validate_identifier(val: str, field_name: str = "id") -> Tuple[bool, str]:
    """Validate format and bounds for identifier parameters."""
    if not val or not isinstance(val, str):
        return False, f"Parameter '{field_name}' must be a non-empty string."
    val_clean = val.strip()
    if not VALID_ID_PATTERN.match(val_clean):
        return False, (
            f"Invalid '{field_name}' format. Must contain only alphanumeric characters, "
            f"hyphens, or underscores (1-80 characters)."
        )
    return True, val_clean


def extract_language_param() -> str:
    """Extract and validate language parameter, defaulting to 'en'."""
    lang = request.args.get("lang", DEFAULT_LANGUAGE).strip().lower()
    return lang if lang in SUPPORTED_LANGUAGES else DEFAULT_LANGUAGE


# =============================================================================
# CUSTOM ERROR HANDLERS (Consistent JSON error responses)
# =============================================================================

@app.errorhandler(400)
def handle_bad_request(err) -> Tuple[Response, int]:
    message = getattr(err, "description", "Bad Request")
    return jsonify({
        "success": False,
        "error": message,
        "status_code": 400
    }), 400


@app.errorhandler(404)
def handle_not_found(err) -> Tuple[Response, int]:
    message = getattr(err, "description", "Requested resource was not found")
    return jsonify({
        "success": False,
        "error": message,
        "status_code": 404
    }), 404


@app.errorhandler(405)
def handle_method_not_allowed(err) -> Tuple[Response, int]:
    return jsonify({
        "success": False,
        "error": "HTTP method not allowed for this endpoint.",
        "status_code": 405
    }), 405


@app.errorhandler(500)
def handle_internal_error(err) -> Tuple[Response, int]:
    return jsonify({
        "success": False,
        "error": "An internal server error occurred while processing the request.",
        "status_code": 500
    }), 500


# =============================================================================
# REST API ENDPOINTS
# =============================================================================

@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify backend status."""
    return jsonify({
        "success": True,
        "status": "healthy",
        "service": "Citizen Services Portal API",
        "supported_languages": SUPPORTED_LANGUAGES,
        "version": "2.0.0"
    }), 200


@app.route("/api/categories", methods=["GET"])
def list_categories():
    """
    GET /api/categories
    Returns all service categories organized by department with scheme counts.
    """
    try:
        categories = get_categories()
        return jsonify({
            "success": True,
            "count": len(categories),
            "categories": categories
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to retrieve categories: {str(e)}",
            "status_code": 500
        }), 500


@app.route("/api/services", methods=["GET"])
def list_services():
    """
    GET /api/services
    Query parameters:
    - category (optional): filter by category id (e.g., 'certificates', 'identity')
    - popular (optional): filter by popular flag ('true' / 'false' / '1' / '0')
    - lang (optional): language code ('en', 'kn', 'hi', 'te', 'ta', 'ml')
    - include_demo (optional): include demonstration records ('true' / 'false')
    """
    category_param = request.args.get("category", "").strip() or None
    popular_param = request.args.get("popular", "").strip() or None
    demo_param = request.args.get("include_demo", "true").strip().lower()
    lang = extract_language_param()

    # Validate category parameter if supplied
    if category_param and category_param.lower() != "all":
        is_valid, clean_or_err = validate_identifier(category_param, "category")
        if not is_valid:
            return jsonify({
                "success": False,
                "error": clean_or_err,
                "status_code": 400
            }), 400
        category_param = clean_or_err
    else:
        category_param = None

    # Validate popular parameter if supplied
    is_popular = None
    if popular_param is not None:
        if popular_param.lower() in ("true", "1", "yes"):
            is_popular = True
        elif popular_param.lower() in ("false", "0", "no"):
            is_popular = False
        else:
            return jsonify({
                "success": False,
                "error": "Parameter 'popular' must be a boolean ('true' or 'false').",
                "status_code": 400
            }), 400

    include_demo = demo_param not in ("false", "0", "no")

    try:
        services = get_services(
            category=category_param,
            is_popular=is_popular,
            lang=lang,
            include_demo=include_demo
        )
        return jsonify({
            "success": True,
            "count": len(services),
            "language": lang,
            "filter": {
                "category": category_param,
                "popular": is_popular
            },
            "services": services
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to retrieve services: {str(e)}",
            "status_code": 500
        }), 500


@app.route("/api/services/<service_id>", methods=["GET"])
def get_service_details(service_id: str):
    """
    GET /api/services/<id>
    Retrieves full service guidance details joined across all 6 tables:
    - Service identifier, Category, Official service name, Simplified description
    - Eligibility questions & target groups
    - Required documents with photocopy counts & issuing sources
    - Application instructions with portal/counter guidance
    - Official website URL & verification source audit information
    """
    is_valid, clean_or_err = validate_identifier(service_id, "id")
    if not is_valid:
        return jsonify({
            "success": False,
            "error": clean_or_err,
            "status_code": 400
        }), 400

    lang = extract_language_param()

    try:
        service = get_service_by_id(clean_or_err, lang=lang)
        if not service:
            return jsonify({
                "success": False,
                "error": f"Government service with id '{clean_or_err}' was not found.",
                "status_code": 404
            }), 404

        return jsonify({
            "success": True,
            "language": lang,
            "service": service
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Error retrieving service: {str(e)}",
            "status_code": 500
        }), 500


@app.route("/api/search", methods=["GET"])
def search():
    """
    GET /api/search?q=<query>&category=<category>&lang=<lang>
    Multilingual search across service titles, descriptions, and regional language keywords
    (English, Kannada, Hindi, Telugu, Tamil, Malayalam) using parameterized SQL queries.
    """
    query = request.args.get("q", "")
    if query is None or not query.strip():
        return jsonify({
            "success": False,
            "error": "Query parameter 'q' is required for service search.",
            "status_code": 400
        }), 400

    query_clean = query.strip()
    if len(query_clean) > 200:
        return jsonify({
            "success": False,
            "error": "Search query too long (maximum 200 characters).",
            "status_code": 400
        }), 400

    category_param = request.args.get("category", "").strip() or None
    if category_param and category_param.lower() != "all":
        is_valid, clean_or_err = validate_identifier(category_param, "category")
        if not is_valid:
            return jsonify({
                "success": False,
                "error": clean_or_err,
                "status_code": 400
            }), 400
        category_param = clean_or_err
    else:
        category_param = None

    lang = extract_language_param()
    demo_param = request.args.get("include_demo", "true").strip().lower()
    include_demo = demo_param not in ("false", "0", "no")

    try:
        results = search_services(
            query_text=query_clean,
            category=category_param,
            lang=lang,
            include_demo=include_demo
        )
        return jsonify({
            "success": True,
            "query": query_clean,
            "category": category_param,
            "language": lang,
            "count": len(results),
            "services": results
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Search processing failed: {str(e)}",
            "status_code": 500
        }), 500


# =============================================================================
# TEXT-TO-SPEECH (TTS) REGIONAL AUDIO STREAMING ENDPOINT
# =============================================================================

AUDIO_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "citizen-services-portal", "public", "audio")
)
os.makedirs(AUDIO_DIR, exist_ok=True)


@app.route("/api/tts", methods=["GET"])
def text_to_speech_stream():
    """
    Streaming Text-to-Speech endpoint for 6 official regional languages:
    en (English), kn (Kannada), hi (Hindi), te (Telugu), ta (Tamil), ml (Malayalam).

    Checks static pre-rendered asset directory first; generates on-the-fly via gTTS
    if not present, caching the resulting MP3 for subsequent requests.
    """
    audio_id = request.args.get("id", "").strip()
    lang = request.args.get("lang", "en").strip().lower()[:2]
    text = request.args.get("text", "").strip()

    if lang not in ["en", "kn", "hi", "te", "ta", "ml"]:
        lang = "en"

    # 1. If an audio_id was provided, check if pre-rendered static file exists
    if audio_id:
        # Sanitize audio_id
        safe_id = re.sub(r"[^a-zA-Z0-9_\-]", "_", audio_id)
        target_filename = f"{safe_id}_{lang}.mp3"
        filepath = os.path.join(AUDIO_DIR, target_filename)
        if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
            return send_file(filepath, mimetype="audio/mpeg")

        # Smart prefix fallback for service-specific audio items
        KNOWN_SERVICES = [
            "income-certificate", "caste-certificate", "residence-certificate",
            "scholarship-guidance", "pension-guidance", "ration-card",
            "ayushman-card", "pm-kisan", "sample-solar-subsidy"
        ]
        for sid in KNOWN_SERVICES:
            if sid in audio_id:
                if "elig" in audio_id:
                    fb = os.path.join(AUDIO_DIR, f"eligibility-all-{sid}_{lang}.mp3")
                    if os.path.exists(fb) and os.path.getsize(fb) > 1000:
                        return send_file(fb, mimetype="audio/mpeg")
                elif "doc" in audio_id:
                    fb = os.path.join(AUDIO_DIR, f"docs-all-{sid}_{lang}.mp3")
                    if os.path.exists(fb) and os.path.getsize(fb) > 1000:
                        return send_file(fb, mimetype="audio/mpeg")
                elif "step" in audio_id or "guid" in audio_id:
                    fb = os.path.join(AUDIO_DIR, f"guidance-all-{sid}_{lang}.mp3")
                    if os.path.exists(fb) and os.path.getsize(fb) > 1000:
                        return send_file(fb, mimetype="audio/mpeg")
                else:
                    fb = os.path.join(AUDIO_DIR, f"service-summary-{sid}_{lang}.mp3")
                    if os.path.exists(fb) and os.path.getsize(fb) > 1000:
                        return send_file(fb, mimetype="audio/mpeg")

    # 2. Check if a hash-based cached file exists for this text & lang
    if not text:
        # If no text, provide general welcome sample for this language
        gen_file = os.path.join(AUDIO_DIR, f"welcome-sample-{lang}.mp3")
        if os.path.exists(gen_file) and os.path.getsize(gen_file) > 1000:
            return send_file(gen_file, mimetype="audio/mpeg")
        return jsonify({
            "success": False,
            "error": "Missing 'text' or 'id' parameter for audio synthesis.",
            "status_code": 400
        }), 400

    content_hash = hashlib.md5(f"{lang}_{text}".encode("utf-8")).hexdigest()[:12]
    hash_filename = f"dynamic_{lang}_{content_hash}.mp3"
    filepath = os.path.join(AUDIO_DIR, hash_filename)

    if not os.path.exists(filepath) or os.path.getsize(filepath) < 1000:
        try:
            from gtts import gTTS
            tts = gTTS(text=text, lang=lang)
            tts.save(filepath)
        except Exception as e:
            # Fallback to language sample if gTTS network call fails
            gen_file = os.path.join(AUDIO_DIR, f"welcome-sample-{lang}.mp3")
            if os.path.exists(gen_file) and os.path.getsize(gen_file) > 1000:
                return send_file(gen_file, mimetype="audio/mpeg")
            return jsonify({
                "success": False,
                "error": f"TTS audio synthesis failed: {str(e)}",
                "status_code": 500
            }), 500

    return send_file(filepath, mimetype="audio/mpeg")


# =============================================================================
# 7. STATE AND UNION TERRITORY ENDPOINTS
# =============================================================================

@app.route("/api/states", methods=["GET"])
def list_states():
    """
    GET /api/states
    Optional query params:
      - type: 'state' or 'ut'
    """
    region_type = request.args.get("type", "").strip() or None
    try:
        states_list = get_states(region_type)
        return jsonify({
            "success": True,
            "count": len(states_list),
            "states": states_list,
            "status_code": 200
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to retrieve states: {str(e)}",
            "status_code": 500
        }), 500


@app.route("/api/states/<state_code>", methods=["GET"])
def get_state_details(state_code: str):
    """
    GET /api/states/<state_code>
    Retrieves official government portal and metadata for a specific state/UT.
    """
    clean_code = state_code.strip()[:5]
    try:
        state_data = get_state_by_code(clean_code)
        if not state_data:
            return jsonify({
                "success": False,
                "error": f"State or Union Territory with code '{clean_code}' was not found.",
                "status_code": 404
            }), 404

        return jsonify({
            "success": True,
            "state": state_data,
            "status_code": 200
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Database error retrieving state: {str(e)}",
            "status_code": 500
        }), 500


@app.route("/api/states/<state_code>/districts", methods=["GET"])
def list_districts(state_code: str):
    """
    GET /api/states/<state_code>/districts
    Retrieves verified official district administration portals (.nic.in / .gov.in).
    """
    clean_code = state_code.strip()[:5]
    try:
        districts = get_districts_by_state(clean_code)
        return jsonify({
            "success": True,
            "stateCode": clean_code.upper(),
            "count": len(districts),
            "districts": districts,
            "status_code": 200
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to retrieve districts: {str(e)}",
            "status_code": 500
        }), 500


@app.route("/api/states/<state_code>/portals", methods=["GET"])
def list_state_portals(state_code: str):
    """
    GET /api/states/<state_code>/portals
    Optional query param:
      - service_id: filter by specific service identifier
    """
    clean_code = state_code.strip()[:5]
    service_id = request.args.get("service_id", "").strip() or None
    try:
        portals = get_state_service_portals(clean_code, service_id)
        return jsonify({
            "success": True,
            "stateCode": clean_code.upper(),
            "count": len(portals),
            "portals": portals,
            "status_code": 200
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Failed to retrieve state portals: {str(e)}",
            "status_code": 500
        }), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Citizen Services Portal Flask API on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)
