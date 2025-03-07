export const testCases = [
  // no errors or warnings
  {
    name: "required-fields-only",
    json: `{"destination": "https://a.test"}`,
  },
  {
    name: "multi-destination",
    json: `{"destination": ["https://a.test", "https://b.test"]}`,
  },
  {
    name: "all-fields",
    json: `{
      "aggregatable_report_window": "-1",
      "aggregation_keys": {"a": "0xf"},
      "debug_key": "1",
      "debug_reporting": true,
      "destination": "https://a.test",
      "event_report_window": "-2",
      "expiry": "-3",
      "filter_data": {"b": ["c"]},
      "priority": "2",
      "source_event_id": "3"
    }`,
  },

  // warnings
  {
    name: "unknown-field",
    json: `{
      "destination": "https://a.test",
      "x": true
    }`,
    expectedWarnings: [{
      path: ["x"],
      msg: "unknown field",
    }],
  },
  {
    name: "destination-url-components",
    json: `{"destination": "https://a.test/b?c=d#e"}`,
    expectedWarnings: [
      {
        path: ["destination"],
        msg: "contains a path that will be ignored",
      },
      {
        path: ["destination"],
        msg: "contains a query string that will be ignored",
      },
      {
        path: ["destination"],
        msg: "contains a fragment that will be ignored",
      },
    ],
  },

  // errors
  {
    name: "invalid-json",
    json: ``,
    expectedErrors: [{msg: "Unexpected end of JSON input"}],
  },
  {
    name: "wrong-root-type",
    json: `1`,
    expectedErrors: [{
      path: [],
      msg: "must be an object",
    }],
  },

  {
    name: "destination-missing",
    json: `{}`,
    expectedErrors: [{
      path: ["destination"],
      msg: "missing required field",
    }],
  },
  {
    name: "destination-wrong-type",
    json: `{"destination": 1}`,
    expectedErrors: [{
      path: ["destination"],
      msg: "must be a list or a string",
    }],
  },
  {
    name: "destination-not-url",
    json: `{"destination": "a.test"}`,
    expectedErrors: [{
      path: ["destination"],
      msg: "must contain a valid URL",
    }],
  },
  {
    name: "destination-untrustworthy",
    json: `{"destination": "http://a.test"}`,
    expectedErrors: [{
      path: ["destination"],
      msg: "must contain a potentially trustworthy URL",
    }],
  },

  {
    name: "filter-data-wrong-type",
    json: `{
      "destination": "https://a.test",
      "filter_data": 1
    }`,
    expectedErrors: [{
      path: ["filter_data"],
      msg: "must be an object",
    }],
  },
  {
    name: "filter-data-values-wrong-type",
    json: `{
      "destination": "https://a.test",
      "filter_data": {"a": "b"}
    }`,
    expectedErrors: [{
      path: ["filter_data", "a"],
      msg: "must be a list",
    }],
  },
  {
    name: "filter-data-value-wrong-type",
    json: `{
      "destination": "https://a.test",
      "filter_data": {"a": [1]}
    }`,
    expectedErrors: [{
      path: ["filter_data", "a", 0],
      msg: "must be a string",
    }],
  },
  // TODO: add tests for exceeding size limits

  {
    name: "aggregation-keys-wrong-type",
    json: `{
      "destination": "https://a.test",
      "aggregation_keys": 1
    }`,
    expectedErrors: [{
      path: ["aggregation_keys"],
      msg: "must be an object",
    }],
  },
  {
    name: "aggregation-keys-value-wrong-type",
    json: `{
      "destination": "https://a.test",
      "aggregation_keys": {"a": 1}
    }`,
    expectedErrors: [{
      path: ["aggregation_keys", "a"],
      msg: "must be a string",
    }],
  },
  {
    name: "aggregation-keys-value-wrong-format",
    json: `{
      "destination": "https://a.test",
      "aggregation_keys": {"a": "3"}
    }`,
    expectedErrors: [{
      path: ["aggregation_keys", "a"],
      msg: "must be a hex128 (must match /^0[xX][0-9A-Fa-f]{1,32}$/)",
    }],
  },
  // TODO: add tests for exceeding size limits

  {
    name: "source-event-id-wrong-type",
    json: `{
      "destination": "https://a.test",
      "source_event_id": 1
    }`,
    expectedErrors: [{
      path: ["source_event_id"],
      msg: "must be a string",
    }],
  },
  {
    name: "source-event-id-wrong-format",
    json: `{
      "destination": "https://a.test",
      "source_event_id": "-1"
    }`,
    expectedErrors: [{
      path: ["source_event_id"],
      msg: "must be a uint64 (must match /^[0-9]+$/)",
    }],
  },

  {
    name: "debug-key-wrong-type",
    json: `{
      "destination": "https://a.test",
      "debug_key": 1
    }`,
    expectedErrors: [{
      path: ["debug_key"],
      msg: "must be a string",
    }],
  },
  {
    name: "debug-key-wrong-format",
    json: `{
      "destination": "https://a.test",
      "debug_key": "-1"
    }`,
    expectedErrors: [{
      path: ["debug_key"],
      msg: "must be a uint64 (must match /^[0-9]+$/)",
    }],
  },

  {
    name: "priority-wrong-type",
    json: `{
      "destination": "https://a.test",
      "priority": 1
    }`,
    expectedErrors: [{
      path: ["priority"],
      msg: "must be a string",
    }],
  },
  {
    name: "priority-wrong-format",
    json: `{
      "destination": "https://a.test",
      "priority": "x"
    }`,
    expectedErrors: [{
      path: ["priority"],
      msg: "must be an int64 (must match /^-?[0-9]+$/)",
    }],
  },

  {
    name: "aggregatable-report-window-wrong-type",
    json: `{
      "destination": "https://a.test",
      "aggregatable_report_window": 1
    }`,
    expectedErrors: [{
      path: ["aggregatable_report_window"],
      msg: "must be a string",
    }],
  },
  {
    name: "aggregatable-report-window-wrong-format",
    json: `{
      "destination": "https://a.test",
      "aggregatable_report_window": "x"
    }`,
    expectedErrors: [{
      path: ["aggregatable_report_window"],
      msg: "must be an int64 (must match /^-?[0-9]+$/)",
    }],
  },

  {
    name: "event-report-window-wrong-type",
    json: `{
      "destination": "https://a.test",
      "event_report_window": 1
    }`,
    expectedErrors: [{
      path: ["event_report_window"],
      msg: "must be a string",
    }],
  },
  {
    name: "event-report-window-wrong-format",
    json: `{
      "destination": "https://a.test",
      "event_report_window": "x"
    }`,
    expectedErrors: [{
      path: ["event_report_window"],
      msg: "must be an int64 (must match /^-?[0-9]+$/)",
    }],
  },

  {
    name: "expiry-wrong-type",
    json: `{
      "destination": "https://a.test",
      "expiry": 1
    }`,
    expectedErrors: [{
      path: ["expiry"],
      msg: "must be a string",
    }],
  },
  {
    name: "expiry-wrong-format",
    json: `{
      "destination": "https://a.test",
      "expiry": "x"
    }`,
    expectedErrors: [{
      path: ["expiry"],
      msg: "must be an int64 (must match /^-?[0-9]+$/)",
    }],
  },

  {
    name: "debug-reporting-wrong-type",
    json: `{
      "destination": "https://a.test",
      "debug_reporting": "true"
    }`,
    expectedErrors: [{
      path: ["debug_reporting"],
      msg: "must be a boolean",
    }],
  },
]
