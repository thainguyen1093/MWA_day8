angular.module("meanBooks", ['ngRoute']).config(config);
function config($routeProvider){
  //$locationProvider.hashPrefix("");

  $routeProvider.when("/", {
    templateUrl: "angular-app/book-list/books.html",
    controller: "BooksController",
    controllerAs: "vm"
  }).when("/book/:id", {
    templateUrl: "angular-app/book-display/book.html",
    controller: "BookController",
    controllerAs: "vm"
  });
}