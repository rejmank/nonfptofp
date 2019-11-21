import {readFromDb} from 'db'

// just simple route
route.get((req)=> {
   res.send(tryToMakeReservation(req.time))
})
// business function that try to make reservation
// this function is impure for two reasons it reads from DB
// and it also log error
const tryToMakeReservation = (time) => {
    try {
       const result = readFromDb(req.time)
       return R.equals('free', result) ? 'Ok' : 'Not possible'
    }
    catch(err){
        console.log(err)
    }
}

// what we can do is, instead of reading from db inside business function 
// we can read inside of request handler (or in any function pushed to side of our program)
route.get((req)=> {
    // request handler is our inpure function pushed to side of program
    // we can call pure functions without making them inpure 
    try {
    const result = readFromDb(req.time)
    res.send(makeReservation(result))
    }
    catch(err) {
         res.send(500)
         console.log(err)
    }
})

// this is pure function, what we want to log is it's inputs and outputs
// because by them we can exactly see what happened in case of problem
const makeReservation = (dbReadResult) => {
     return R.equals('free', dbReadResult) ? 'Ok' : 'Not possible'
}
