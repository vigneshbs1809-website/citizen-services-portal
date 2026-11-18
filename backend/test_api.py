"""
Comprehensive Test Suite for Citizen Services Portal Flask API
==============================================================
Tests all 6 normalized SQLite tables, endpoints, multilingual support,
parameterized queries, input validation, and required fields.
"""

import unittest
from app import app


class CitizenServicesApiTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health_check(self):
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(len(data["supported_languages"]), 6)

    def test_get_categories(self):
        res = self.client.get("/api/categories")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertGreaterEqual(data["count"], 4)
        cat_ids = [c["id"] for c in data["categories"]]
        self.assertIn("certificates", cat_ids)
        self.assertIn("identity", cat_ids)

    def test_get_services_all(self):
        res = self.client.get("/api/services")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertGreaterEqual(data["count"], 8)
        self.assertIn("services", data)

    def test_get_services_multilingual_kannada(self):
        res = self.client.get("/api/services?lang=kn")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertEqual(data["language"], "kn")
        # Income certificate title should be in Kannada
        income = next((s for s in data["services"] if s["id"] == "income-certificate"), None)
        self.assertIsNotNone(income)
        self.assertIn("ಆದಾಯ", income["title"])

    def test_get_services_filter_category(self):
        res = self.client.get("/api/services?category=certificates")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        for s in data["services"]:
            self.assertEqual(s["category"], "certificates")

    def test_get_services_filter_popular(self):
        res = self.client.get("/api/services?popular=true")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        for s in data["services"]:
            self.assertTrue(s["isPopular"])

    def test_get_services_invalid_category(self):
        res = self.client.get("/api/services?category=bad%20cat!@#")
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertFalse(data["success"])
        self.assertIn("Invalid", data["error"])

    def test_get_services_invalid_popular(self):
        res = self.client.get("/api/services?popular=not_a_bool")
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertFalse(data["success"])

    def test_get_service_by_id_required_fields(self):
        """Verify all fields explicitly required by the prompt are present."""
        res = self.client.get("/api/services/income-certificate")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        s = data["service"]

        # 1. Service identifier
        self.assertEqual(s["service_identifier"], "income-certificate")
        # 2. Category
        self.assertEqual(s["category"], "certificates")
        # 3. Official service name
        self.assertIn("Income Certificate", s["official_service_name"])
        # 4. Simplified description
        self.assertTrue(len(s["simplified_description"]) > 10)
        # 5. Eligibility
        self.assertIn("eligibility", s)
        self.assertTrue(len(s["eligibility"]["questions"]) > 0)
        # 6. Required documents
        self.assertIn("required_documents", s)
        self.assertTrue(len(s["required_documents"]) > 0)
        # 7. Application steps
        self.assertIn("application_steps", s)
        self.assertTrue(len(s["application_steps"]) > 0)
        # 8. Official website URL
        self.assertTrue(s["official_website_url"].startswith("http"))
        # 9. Language code
        self.assertEqual(s["language_code"], "en")
        # 10. Verification source
        self.assertTrue(len(s["verification_source"]) > 5)
        # 11. Last verified date
        self.assertIn("2026-", s["last_verified_date"])

    def test_get_service_by_id_hindi_translation(self):
        """Verify Hindi localization across 6 tables."""
        res = self.client.get("/api/services/income-certificate?lang=hi")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        s = data["service"]
        self.assertEqual(s["language_code"], "hi")
        self.assertIn("आय प्रमाण पत्र", s["title"])
        # Documents should also have localized names
        self.assertTrue(len(s["documentDetails"]) > 0)
        self.assertIn("वेतन पर्ची", s["documentDetails"][0]["name"])

    def test_get_service_by_id_not_found(self):
        res = self.client.get("/api/services/non-existent-service-1234")
        self.assertEqual(res.status_code, 404)
        data = res.get_json()
        self.assertFalse(data["success"])
        self.assertIn("not found", data["error"])

    def test_get_service_by_id_invalid_format(self):
        res = self.client.get("/api/services/invalid%20id%20with%20spaces!")
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertFalse(data["success"])

    def test_demonstration_record_clearly_marked(self):
        """Verify sample records are clearly marked as demonstration content."""
        res = self.client.get("/api/services/sample-solar-subsidy")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        s = data["service"]
        self.assertTrue(s["is_demonstration"])
        self.assertIn("DEMONSTRATION", s["official_service_name"])
        self.assertIn("Demonstration", s["verification_source"])

    def test_search_services_english(self):
        res = self.client.get("/api/search?q=pension")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertGreaterEqual(data["count"], 1)

    def test_search_services_kannada(self):
        res = self.client.get("/api/search?q=%E0%B2%86%E0%B2%A6%E0%B2%BE%E0%B2%AF&lang=kn")  # ಆದಾಯ (Income)
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertGreaterEqual(data["count"], 1)
        self.assertEqual(data["services"][0]["id"], "income-certificate")

    def test_search_services_hindi(self):
        res = self.client.get("/api/search?q=%E0%A4%86%E0%A4%AF&lang=hi")  # आय (Income)
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertGreaterEqual(data["count"], 1)
        service_ids = [s["id"] for s in data["services"]]
        self.assertIn("income-certificate", service_ids)

    def test_search_services_missing_query(self):
        res = self.client.get("/api/search")
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertFalse(data["success"])
        self.assertIn("required", data["error"])

    def test_search_services_empty_query(self):
        res = self.client.get("/api/search?q=%20%20")
        self.assertEqual(res.status_code, 400)
        data = res.get_json()
        self.assertFalse(data["success"])

    def test_method_not_allowed(self):
        res = self.client.post("/api/services", json={"test": "data"})
        self.assertEqual(res.status_code, 405)
        data = res.get_json()
        self.assertFalse(data["success"])
        self.assertEqual(data["status_code"], 405)

    def test_get_all_states(self):
        res = self.client.get("/api/states")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertEqual(data["count"], 36)

    def test_get_states_filtered_by_type(self):
        res_states = self.client.get("/api/states?type=state")
        self.assertEqual(res_states.status_code, 200)
        self.assertEqual(res_states.get_json()["count"], 28)

        res_uts = self.client.get("/api/states?type=ut")
        self.assertEqual(res_uts.status_code, 200)
        self.assertEqual(res_uts.get_json()["count"], 8)

    def test_get_state_details(self):
        res = self.client.get("/api/states/KA")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertEqual(data["state"]["name"], "Karnataka")
        self.assertIn("sevasindhu", data["state"]["servicePortalUrl"])

    def test_get_state_districts(self):
        res = self.client.get("/api/states/KA/districts")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertGreaterEqual(data["count"], 1)

    def test_get_state_portals(self):
        res = self.client.get("/api/states/KA/portals")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["success"])
        self.assertGreaterEqual(data["count"], 1)


if __name__ == "__main__":
    unittest.main()
