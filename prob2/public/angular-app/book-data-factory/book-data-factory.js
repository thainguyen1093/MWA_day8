angular.module("meanBooks").factory("BookDataFactory", BookDataFactory);
function BookDataFactory($http) {
  return {
    getAll: getAll,
    getOne: getOne
  }

  function getAll() {
    return $http.get("/api/books").then(complete).catch(failed);
  }
  function getOne(id) {
    return $http.get("/api/books/" + id).then(complete).catch(failed);
  }

  function complete(response) {
    console.log(response.data);
    return response.data;
  }

  function failed(error){
    return error.status.statusText;
  }
}