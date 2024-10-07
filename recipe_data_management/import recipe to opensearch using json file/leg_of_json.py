import json
with open("full_format_recipes.json", "r") as f:
    recipes = json.load(f)
    print(len(recipes))  # Print the number of recipes in the JSON file