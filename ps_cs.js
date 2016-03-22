chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // goes through and finds all the authors and counts the titles
  if (request.action == "itemCounts") {
    var authors = $('.search-result__author a');
    var hist = {};

    authors.map(function (a) {
      if (a.title in hist) {
        hist[a.title]++;
      } else {
        hist[a.title] = 1;
      }
    });

    for (var a in hist) {
      var aName = '"' + a + '"';
      var links = $('.search-result__author a[title=' + aName + ']');

      $.each(links, function (i, v) {
        v.innerText = a + ' - ' + hist[a];
      });
    }
  }

  if (request.action == "makeSortable") {
    // $('.course').dataTable({ "bPaginate": false });
    $('.search-result__title').dataTable({ "bPaginate": false });
  }
});

chrome.runtime.sendMessage({action:"show"});