const assert = require('assert');
const app = require('./server');

const server = app.listen(8001, async () => {
  const __url = 'http://localhost:8001/';
  console.log('Running test suite for Timestamp Microservice...\n');

  try {
    // Test 1 & 2: /api/2016-12-25
    let res = await fetch(`${__url}api/2016-12-25`);
    let data = await res.json();
    assert.strictEqual(data.unix, 1482624000000, 'Unix timestamp for 2016-12-25');
    assert.strictEqual(data.utc, 'Sun, 25 Dec 2016 00:00:00 GMT', 'UTC string for 2016-12-25');
    console.log('✓ Valid date string (2016-12-25) passed');

    // Test 3: /api/1451001600000
    res = await fetch(`${__url}api/1451001600000`);
    data = await res.json();
    assert.strictEqual(data.unix, 1451001600000, 'Unix timestamp integer input');
    assert.strictEqual(data.utc, 'Fri, 25 Dec 2015 00:00:00 GMT', 'UTC string integer input');
    console.log('✓ Unix integer input (1451001600000) passed');

    // Test 4: /api/05 October 2011
    res = await fetch(`${__url}api/05%20October%202011`);
    data = await res.json();
    assert.strictEqual(data.unix, 1317772800000);
    assert.strictEqual(data.utc, 'Wed, 05 Oct 2011 00:00:00 GMT');
    console.log('✓ Natural date string (05 October 2011) passed');

    // Test 5: /api/this-is-not-a-date
    res = await fetch(`${__url}api/this-is-not-a-date`);
    data = await res.json();
    assert.strictEqual(data.error.toLowerCase(), 'invalid date');
    console.log('✓ Invalid date error passed');

    // Test 6 & 7: /api (empty date parameter)
    res = await fetch(`${__url}api`);
    data = await res.json();
    const now = Date.now();
    assert.ok(Math.abs(data.unix - now) < 5000, 'Empty date unix close to now');
    const serverTime = new Date(data.utc).getTime();
    assert.ok(Math.abs(serverTime - now) < 5000, 'Empty date utc close to now');
    console.log('✓ Empty date parameter passed');

    console.log('\n✓ All 7 Timestamp Microservice tests passed successfully!');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    server.close();
  }
});
