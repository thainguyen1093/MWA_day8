angular.module("meanBooks").controller("BookController", BookController);
function BookController(BookDataFactory, $routeParams) {
  var vm = this;
  var id = $routeParams.id;
  BookDataFactory.getOne(id).then(function (response) {
    vm.book = response;
    vm.rate = response.rate;
    console.log(response);
  })
}