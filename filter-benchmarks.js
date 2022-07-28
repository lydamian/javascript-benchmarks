const Benchmark = require('benchmark');
const conditional = (x) => x != 'b';

const filter_in_place = (a, condition, thisArg) => {
  let i = 0, j = 0;

  while (i < a.length) {
    const val = a[i];
    if (condition(val, i, a)) a[j++] = val;
    i++;
  }

  a.length = j;
  return a;
};

const run_suite = (arr_length) => {
  console.log(`Filter comparison of array length ${arr_length}`);
  const arr = Array(arr_length).fill('a');
  const suite = new Benchmark.Suite();
  // add tests
  suite
  .add('native javascript filter', function() {
    arr.filter(conditional)
  })
  .add('for loop filter', function() {
    const filtered_arr = [];
    for (let i = 0; i < arr.length; i++) {
      if (conditional) {
        filtered_arr.push(arr[i]);
      }
    }
  })
  .add('filter in place', function() {
    filter_in_place(arr, conditional)
  })
  .on('cycle', function(event) {
    console.log(event.type, String(event.target));

  })
  // add listeners
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // dont run async
  .run({ 'async': false });
  console.log('Finished');
}


run_suite(1000);
run_suite(10000);
run_suite(100000);
run_suite(1000000);