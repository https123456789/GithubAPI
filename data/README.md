# Data

## generic.json

`generic.json` stores the information that the server uses to preform most operations. This includes resource update interval controls.

To adjust the interval at which a resource is updated, modify the `interval` value in the `pathUpdates` object.

To change the global interval, change the `updater.interval` value.

> Note: Changes in the `updater.interval` value will not affect existing resource `interval` values. It will only affect new resources.

### Example: Change `"/"` to 1 hour

### Before
```json
"/": {
	"time": 1651089628,
	"interval": 86400
}
```

<details>
	<summary>Full Data</summary>

```json
{
    "info": "/info",
    "updater": {
        "interval": 3600,
        "lut": 1651090299,
        "lup": "/users/https123456789",
        "pathUpdates": {
            "/": {
                "time": 1651089628,
                "interval": 86400
            },
            "/users/https123456789": {
                "time": 1651090613,
                "interval": 3600
            }
        }
    },
    "intervals": {
        "hour": 3600,
        "day": 86400,
        "week": 604800,
        "month": 2629743,
        "year": 31556926
    }
}
```
</details>

### After

```json
"/": {
	"time": 1651089628,
	"interval": 3600
}
```

<details>
	<summary>Full Data</summary>

```json
{
    "info": "/info",
    "updater": {
        "interval": 3600,
        "lut": 1651090299,
        "lup": "/users/https123456789",
        "pathUpdates": {
            "/": {
                "time": 1651089628,
                "interval": 3600
            },
            "/users/https123456789": {
                "time": 1651090613,
                "interval": 3600
            }
        }
    },
    "intervals": {
        "hour": 3600,
        "day": 86400,
        "week": 604800,
        "month": 2629743,
        "year": 31556926
    }
}
```
</details>