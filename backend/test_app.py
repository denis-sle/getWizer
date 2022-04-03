import unittest
from app import choiceCalc as Calculator

class TestCalc(unittest.TestCase):
    def test_calc(self):
        self.assertIn(Calculator([10, 20]), [10, 20], "Should be 10 or 20")

if __name__ == '__main__':
    unittest.main()
