import json

path = 'c:/Users/Lucciano Scapini/Documents/Personal/Codigos/Estudio-redes/src/data/preguntas.json'

try:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    issues = []
    for idx, item in enumerate(data):
        # Check for missing keys
        required_keys = ['subject', 'question', 'options', 'correct', 'explanation']
        for key in required_keys:
            if key not in item:
                issues.append(f"Item {idx}: Missing key '{key}'")
        
        # Check if correct option exists
        if 'options' in item and 'correct' in item:
            valid_keys = [opt['key'] for opt in item['options']]
            if item['correct'] not in valid_keys:
                issues.append(f"Item {idx}: Correct option '{item['correct']}' not found in options {valid_keys}")
        
        # Check for empty content
        if not item.get('question'):
            issues.append(f"Item {idx}: Empty question text")
        
        # Check for duplicate options
        if 'options' in item:
            seen_values = set()
            for opt in item['options']:
                if opt['value'] in seen_values:
                    issues.append(f"Item {idx}: Duplicate option value '{opt['value']}'")
                seen_values.add(opt['value'])

    if issues:
        print("Found issues:")
        for issue in issues:
            print(issue)
    else:
        print("No logical issues found in JSON structure.")

except Exception as e:
    print(f"Error reading or parsing JSON: {e}")
