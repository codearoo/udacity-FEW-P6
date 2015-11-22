/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have non empty URLs', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(typeof feed.url).not.toBe('undefined');
                expect(feed.url).not.toBe('');
            }
        });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have non empty names', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(typeof feed.name).not.toBe('undefined');
                expect(feed.name).not.toBe('');
            }
        });

    });

    describe('The menu', function () {
        /* DONE: Write a new test suite named "The menu" */

        var body;

        beforeEach(function () {
            var bodyTags = document.getElementsByTagName('body');
            expect(bodyTags.length).toBe(1);
            body = bodyTags[0];
        });

        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            // body has class of 'menu-hidden' at start.
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* DONE: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('shows and hides when menu icon clicked', function () {
            expect(body.classList.contains('menu-hidden')).toBe(true);

            var menuIconTags = document.getElementsByClassName('icon-list');
            expect(menuIconTags.length).toBe(1);
            var menuIcon = menuIconTags[0];
            menuIcon.click(); // simulate the click.
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click(); // simulate the click.
            expect(body.classList.contains('menu-hidden')).toBe(true);

        });
    });

    describe('Initial Entries', function () {
        /* DONE: Write a new test suite named "Initial Entries" */

        beforeEach(function (done) {
            loadFeed(0, function () { done(); });
        });

        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('completes with at least 1 .entry element', function (done) {
            var feedClasses = document.getElementsByClassName('feed');
            expect(feedClasses.length).toBeGreaterThan(0);
            var entryClasses = document.getElementsByClassName('entry');
            expect(entryClasses.length).toBeGreaterThan(0);
            done();
        });

        describe('New Feed Selection', function () {
            /* DONE: Write a new test suite named "New Feed Selection" */

            var listHeadings = [];

            /* DONE: Write a test that ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * Remember, loadFeed() is asynchronous.
             */
            it('actually changes content', function (done) {

                var entryClasses = document.getElementsByClassName('entry');
                expect(entryClasses.length).toBeGreaterThan(0);
                for (var i = 0; i < entryClasses.length; i++) {
                    var entry = entryClasses[i];
                    var h2Tags = entry.getElementsByTagName('h2');
                    expect(h2Tags.length).toBeGreaterThan(0);
                    for (var j = 0; j < h2Tags.length; j++) {
                        var h2 = h2Tags[j];
                        listHeadings.push(h2.textContent);
                    }
                }

                done();
            });

            describe('Second feed loading', function() {

                beforeEach(function (done) {
                    loadFeed(1, function () { done(); });
                });

                it('has different headlines from 1st feed', function(done) {

                    var listHeadings2 = [];

                    var entryClasses2 = document.getElementsByClassName('entry');
                    expect(entryClasses2.length).toBeGreaterThan(0);
                    for (var i = 0; i < entryClasses2.length; i++) {
                        var entry2 = entryClasses2[i];
                        var h2Tags2 = entry2.getElementsByTagName('h2');
                        expect(h2Tags2.length).toBeGreaterThan(0);
                        for (var j = 0; j < h2Tags2.length; j++) {
                            var h2_2 = h2Tags2[j];
                            listHeadings2.push(h2_2.textContent);
                        }
                    }

                    // now compare the 1st list to the 2nd and verify they differ.
                    var same = listHeadings.length === listHeadings2.length;

                    for (var a = 0; a < listHeadings.length; a++) {
                        if (listHeadings2[a])
                            same = same && listHeadings[a] === listHeadings2[a];
                        if (!same) break;
                    }

                    if (same) throw Error('Headlines are identical');

                    done();

                });
            });
        });
    });

}());
