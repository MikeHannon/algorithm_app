<h1>Framework for algorithms for Coding Dojo</h1>
<h4>To test functionality:</h4>
1) This uses a mongo db, there are no default algorithms.
2) To auto - generate an administer account, login in with a fake codingdojo email with at least 6 characters (xxxxxx@codingdojo.com).
3) Requires mongo to be up and running.

<h4>Generating algorithms (as an Admin):</h4>
1) Use the console log: when you attempt to save a new algorithm, errors are shown in the console. /fix required.
2) All fields have to be dirty to save them.
3) The algorithm fields are: top left -> what a user will see, top right: TDD, bottom left: testable solutions to test TDD, bottom right: results of tests.

<h4>Using console comparisons</h4>
1) generate a local variable that equals console.log (e.g. var local=console.log);
2) generate a local fake console object: var console = {};
3) two local variables e.g. j and k as arrays. (var k = [], j = []); < or as many as you want for the various tests.
4) add a method to console -> log = function(data){k.push(data);}
5) run the function from the student (populates k);
6) write a functional solution that console.logs an appropriate result.
7) change the log method of console to function(data){j.push(data);}
8) run your solution.
9) now j and k are populated, so you can compare individual pieces!

<h4> Using return comparisons</h4>
1) write appropriate test solutions then run if else statements.

<h5>Success versus Failure</h5>
After tests are run, if the word failure occurs in response, the algorithm fails.
