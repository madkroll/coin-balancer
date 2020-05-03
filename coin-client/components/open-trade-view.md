# Open Trade View

## Targets

1. Signals to buy source coin back
2. Signals to buy CG
3. Shows real-time win / loss

## Fields

```json
{
  "id" : "87e3f86b-ac48-4c84-a2f5-8b5739aec9c5",
  "timestamp" : 1588513204,
  "datetime" : "01-01-2020T11:12:13.324",
  "title" : "ZRX to KNC",
  "sold" : {
    "currency" : "ZRX",
    "amount" : 123,
    "rate" : 0.19,
    "cgRate" : 0.00004,
    "currentRate": 0.2,
    "currentCGRate": 0.00006
  },
  "bought" : {
    "currency" : "KNC",
    "amount" : 30,
    "buyBackAmount" : 123,
    "currentRate": 0.2,
    "currentCGRate": 0.00006
  }
}
```

## Output controls

- baseline at trade timestamp
- trade date time
- minimum win level
- target win level
- loss red line
- real time update on client (1 query per minute)

## Signals

- send e-mails on crossing levels