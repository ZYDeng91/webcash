process.env['NODE_ENV']= 'test'
import assert from 'assert'
import { checkStamp, testExports } from '../validator.mjs'
describe('Validator', function () {
  describe('clzCheck', function() {
    it('should return true given stamp whose hash has enough leading zeros', function () {
      assert.equal(testExports.clzCheck("1:20:250206:me@example.org::VX4E==PO:12c4b", 20), true);
    });
 
    it('should return false given underclaimed stamp', function () {
      assert.equal(testExports.clzCheck("1:20:250206:me@example.org::YL3zYFXA:cded9", 22), false);
    });

    it('should return true given long stamp', function () {
      assert.equal(testExports.clzCheck("1:40:051222:foo@bar.org::Cu2iqc4SmotZ7MRR:0000214c3J", 40), true);
    });
  });


  describe('expiryCheck', function() {
    it('should return false given valid date', function () {
      assert.equal(testExports.expiryCheck("250205", 2*24*3600*1000, 1738845380000), false);
    });

    it('should return true given expired date', function () {
      assert.equal(testExports.expiryCheck("010101", 2*24*3600*1000, 1738845380000), true);
    });

    it('should return true given future date', function () {
      assert.equal(testExports.expiryCheck("770707", 2*24*3600*1000, 1738845380000), true);
    });

    it('should return true given not a date', function () {
      assert.equal(testExports.expiryCheck("x", 2*24*3600*1000, 1738845380000), true);
    });

  });

  describe('checkStamp', function() {
    it('should return "malformed stamp" given not a stamp', function () {
      assert.equal(checkStamp("1:k::me@example.org::x:d:", "me@example.org", 20, 2*24*3600*1000, 1738845380000), "malformed stamp");
      assert.equal(checkStamp("1:k::me@example.org:x:d", "me@example.org", 20, 2*24*3600*1000, 1738845380000), "malformed stamp");
    });
    it('should return "ok" given valid stamp', function () {
      assert.equal(checkStamp("1:20:250206:me@example.org::VX4E==PO:12c4b", "me@example.org", 20, 2*24*3600*1000, 1738845380000), "ok");
    });
  });
});
