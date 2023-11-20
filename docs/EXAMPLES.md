# dc-extension-bynder

This section presents example schemas for the various select possibilities.

## Example schemas 

### Single Select schema

```json
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "https://demostore.amplience.com/content/bynder/single-select",
	"title": "Bynder Single Select",
	"description": "Example Schema for single select items from Bynder",
	"allOf": [
		{
			"$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"
		}
	],
	"type": "object",
	"properties": {
		"bynder": {
			"title": "Bynder Object",
			"description": "A single reference to an item in Bynder",
			"type": "object",
			"properties": {},
			"ui:extension": {
				"name": "bynder-single"
			}
		}
	},
	"propertyOrder": []
}
```

### Single Select File schema

```json
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "https://demostore.amplience.com/content/bynder/single-select-file",
	"title": "Bynder Single Select File",
	"description": "Example Schema for single select items from Bynder with file selection",
	"allOf": [
		{
			"$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"
		}
	],
	"type": "object",
	"properties": {
		"bynder": {
			"title": "Bynder Object File Selection",
			"description": "A single reference to an item in Bynder with file selection",
			"type": "object",
			"properties": {},
			"ui:extension": {
				"name": "bynder-single-file"
			}
		}
		
	},
	"propertyOrder": []
}
```

### Multi Select

```json
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "https://demostore.amplience.com/content/bynder/multi-select",
	"title": "Bynder Multi Select",
	"description": "Example Schema for multi select items from Bynder",
	"allOf": [
		{
			"$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"
		}
	],
	"type": "object",
	"properties": {
		"bynder": {
			"title": "Bynder Array",
			"description": "A list of references to items in Bynder",
			"type": "array",
			"items": {
			},
			"ui:extension": {
                "name": "bynder-multi",
                "params": {
                }
            }
		}
	},
	"propertyOrder": []
}
```