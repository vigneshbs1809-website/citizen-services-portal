"""
Citizen Services Portal - Database Initialization Script
========================================================
CLI tool to initialize, verify, and seed SQLite database with all 6 tables:
1. services
2. service_translations
3. service_documents
4. service_eligibility
5. service_steps
6. service_sources

Usage:
    python init_db.py           # Initialize if not present
    python init_db.py --reset   # Drop and re-create schema and reload seed data
"""

import sys
import sqlite3
from database import init_db, get_db_connection, DB_FILE


def verify_tables():
    """Verify table counts and output a summary report."""
    conn = get_db_connection()
    cursor = conn.cursor()

    tables = [
        "services",
        "service_translations",
        "service_documents",
        "service_eligibility",
        "service_steps",
        "service_sources"
    ]

    print("\n" + "=" * 65)
    print("CITIZEN SERVICES PORTAL - DATABASE VERIFICATION REPORT")
    print("=" * 65)
    print(f"Database File: {DB_FILE}\n")

    all_ok = True
    for tbl in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) AS count FROM {tbl}")
            cnt = cursor.fetchone()["count"]
            print(f"  [OK] Table '{tbl}': {cnt} records")
        except sqlite3.OperationalError as e:
            print(f"  [FAIL] Table '{tbl}': Error - {e}")
            all_ok = False

    # Language support audit
    print("\n--- Multilingual Coverage Audit (6 Languages) ---")
    cursor.execute("""
        SELECT language_code, COUNT(*) AS count
        FROM service_translations
        GROUP BY language_code
        ORDER BY language_code ASC
    """)
    lang_rows = cursor.fetchall()
    for lr in lang_rows:
        print(f"  Language '{lr['language_code']}': {lr['count']} translated service records")

    # Verification Source & Demonstration content audit
    print("\n--- Official Verification Audit ---")
    cursor.execute("""
        SELECT
            SUM(CASE WHEN is_demo = 0 THEN 1 ELSE 0 END) AS verified_count,
            SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) AS demo_count
        FROM services
    """)
    row = cursor.fetchone()
    print(f"  Verified Official Schemes: {row['verified_count']}")
    print(f"  Clearly Marked Demonstration Content: {row['demo_count']}")

    cursor.execute("""
        SELECT service_id, verification_source, last_verified_date
        FROM service_sources
        LIMIT 3
    """)
    src_samples = cursor.fetchall()
    print("\nSample Verification Citations:")
    for s in src_samples:
        print(f"  - {s['service_id']}: Verified '{s['last_verified_date']}' via {s['verification_source']}")

    conn.close()
    print("=" * 65)
    return all_ok


def main():
    reset = "--reset" in sys.argv or "-r" in sys.argv
    if reset:
        print("[Init] Resetting existing database and recreating schema...")
    else:
        print("[Init] Initializing database schema...")

    try:
        init_db(reset=reset)
        success = verify_tables()
        if success:
            print("\nDatabase initialization completed successfully!")
            sys.exit(0)
        else:
            print("\nDatabase initialization encountered issues.")
            sys.exit(1)
    except Exception as e:
        print(f"\n[Error] Database initialization failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
