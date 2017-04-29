const Markov = require('./markov');
markov = new Markov();

markov.separator = ' ';
markov.learn('Mainstream (FAKE) media refuses to state our long list of achievements, including 28 legislative signings, strong borders & great optimism!');
markov.learn('Looking forward to RALLY in the Great State of Pennsylvania tonight at 7:30. Big crowd, big energy!');
markov.learn('North Korea disrespected the wishes of China & its highly respected President when it launched, though unsuccessfully, a missile today. Bad!');
markov.learn('As families prepare for summer vacations in our National Parks - Democrats threaten to close them and shut down the government. Terrible!');
console.log(markov.ask());