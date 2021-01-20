angular.module("meanBooks").controller("BooksController", BooksController);
function BooksController(BookDataFactory) {
  var vm = this;
  vm.title = "Mean Book App";
  BookDataFactory.getAll().then(function(response){
    vm.books = response;
  })
}