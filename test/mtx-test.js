/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';

const assert = require('bsert');
const MTX = require('../lib/primitives/mtx');
const Address = require('../lib/primitives/address');
const Input = require('../lib/primitives/input');
const Output = require('../lib/primitives/output');

describe('MTX', function () {
  it('should en/decode mtx with 1 in, 1 out', () => {
    const input = new Input({
      prevout: {
        hash: Buffer.alloc(32),
        index: 0
      }
    });
    const output = new Output({
      value: 1e8,
      address: new Address()
    });
    const mtx1 = new MTX({
      inputs: [input],
      outputs: [output]
    });
    const mtx2 = MTX.fromRaw(mtx1.toRaw());
    assert.deepStrictEqual(mtx1, mtx2);
  });

  it('should en/decode mtx with 0 in, 1 out', () => {
    const output = new Output({
      value: 1e8,
      address: new Address()
    });
    const mtx1 = new MTX({
      outputs: [output]
    });
    const mtx2 = MTX.fromRaw(mtx1.toRaw());
    assert.deepStrictEqual(mtx1, mtx2);
  });

  it('should encode and decode mtx with multiple inputs and outputs', () => {
    const input1 = new Input({
      prevout: {
        hash: Buffer.alloc(32),
        index: 0
      }
    });
    const input2 = new Input({
      prevout: {
        hash: Buffer.alloc(32),
        index: 1
      }
    });
    const output1 = new Output({
      value: 1e8,
      address: new Address()
    });
    const output2 = new Output({
      value: 2e8,
      address: new Address()
    });
    const mtx1 = new MTX({
      inputs: [input1, input2],
      outputs: [output1, output2]
    });
    const mtx2 = MTX.fromRaw(mtx1.toRaw());
    assert.deepStrictEqual(mtx1, mtx2);
  });

  it('should encode and decode mtx with segwit inputs and outputs', () => {
    const input = new Input({
      prevout: {
        hash: Buffer.alloc(32),
        index: 0
      },
      witness: [Buffer.alloc(4)]
    });
    const output = new Output({
      value: 1e8,
      address: new Address(),
      script: Buffer.alloc(4)
    });
    const mtx1 = new MTX({
      inputs: [input],
      outputs: [output]
    });
    const mtx2 = MTX.fromRaw(mtx1.toRaw());
    assert.deepStrictEqual(mtx1, mtx2);
  });
});
