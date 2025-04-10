
    function execute(a, b) {
  return a + b;
}
    const result = execute(12, 3);
    const expected = 15;
    if (result === expected) {
      console.log('✅ Passed');
    } else {
      console.log('Failed: got', result, 'but expected', expected);
    }
  