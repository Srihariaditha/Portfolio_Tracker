const assert = require('assert')
let chai = require('chai')
let chaiHttp = require("chai-http")
let server = require("../server")
let should = chai.should();
chai.use(chaiHttp)


describe("CRUD Operations", function(){
  var securities = [{
    "companyTicker": "TCSS1",
    "pricePerShare": "1268.93",
    "numOfShares": "234"
  },{
    "companyTicker": "WIPRO1",
    "pricePerShare": "1460.93",
    "numOfShares": "560"
  },{
    "companyTicker": "GODREJ1",
    "pricePerShare": "100",
    "numOfShares": "10"
  }]
  it("1 should delete all securites", (done) => {
    console.log("deleting Securities from a portfolio")
    chai.request(server)
      .delete('/')
      .send({})
      .end((err,res)=>{
        res.should.have.status(200);
        console.log("Response body: ", res.body);
        done()
      })
  })
  it("2 Should add  securities to db", (done)=>{
    for(security in securities){
      chai.request(server)
          .post('/addSecurity')
          .send(securities[security])
          .end((err,res)=>{
            res.should.have.status(200);
            console.log("Response body: ",res.body)
          })
    }
    done();
  })

  it("3 should get all securites", (done) => {
    console.log("Getting all Securities from a portfolio")
    chai.request(server)
      .get('/allSecurities')
      .send({})
      .end((err,res)=>{
        res.should.have.status(200);
        console.log("Response body: ", res.body);
        //console.log("3 : "+err);
        done()
      })
  })

  it('4 should fetch a single security only by ticker', (done) => {
    console.log('Getting a security ')
    chai.request(server)
        .get('/security/'+securities[1].companyTicker)
        .send({})
        .end((err,res) => {
          res.should.have.status(200);
          console.log("Response body: ", res.body);
          //console.log("4 : "+err);
          done()
        })
  })
  it("5 Should fetchReturns", (done)=>{
    chai.request(server)
        .get('/fetchReturns')
        .end((err, res)=>{
            res.should.have.status(200)
            console.log("Returns for portfolio : ", res.body)
            console.log("5 : "+err);
            done()
        })
  })

  it(' 6 should add a trade to a security', (done)=> {
    console.log("Adding a trade by test")
    chai.request(server)
        .patch('/buyTrade/'+securities[2].companyTicker)
        .send({
          "pricePerShare": "300",
          "numOfShares": "30"})
        .end((err,res) => {
          //console.log(res)
          res.should.have.status(200)
          res.body.avgPrice.should.eq(250)
          res.body.sharesLeft.should.eq(40)
          console.log("Response body for Add trade: "+ securities[2].companyTicker + " ", res.body);
          console.log("6 : "+err);
          done()
        })
  })

  it('7 : should sell a trade of security', (done)=> {
    console.log("Selling a trade")
    chai.request(server)
        .patch('/sellTrade/'+securities[2].companyTicker)
        .send({
          "pricePerShare": "300",
          "numOfShares": "20"})
        .end((err,res) => {
          res.should.have.status(200)
          res.body.avgPrice.should.eq(250)
          res.body.sharesLeft.should.eq(20)
          //res.body.trades.length.should.eq(2);
          console.log("Response body of sell trade : "+ securities[2].companyTicker + " ", res.body);
          console.log("7 : "+err);

          done()
        })
  })

  it("8 : Should Delete Particular security", (done)=>{
    chai.request(server)
        .delete("/deleteSecurity/"+securities[1].companyTicker)
        .end((err, result)=>{
            result.should.have.status(200)
            console.log("Deleted Particlar Security " + securities[2].companyTicker + " ", result.body)
            console.log("8 : "+err);

            done()
        })
  })
})
