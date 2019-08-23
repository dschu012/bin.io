import { BinaryWriter } from '../src/binarywriter';
import { expect } from 'chai';
import { TextEncoder } from 'util';

describe('BinaryWriter', () => {
    it('test write int8 and uint8', () => {
        let writer = new BinaryWriter();
        let arr = writer.WriteInt8(-1)
          .WriteUInt8(254)
          .toArray();
        expect(arr.byteLength).to.eq(2);
        expect(arr[0]).to.eq(0xff);
        expect(arr[1]).to.eq(0xfe);
    });

    it('test write int16 and uint16', () => {
      let writer = new BinaryWriter().SetBigEndian();
        let arr = writer.WriteInt16(-1)
          .WriteUInt16(254)
          .toArray();
        expect(arr.byteLength).to.eq(4);
        expect(arr.slice(0,2)).to.eql(new Uint8Array([0xff,0xff]));
        expect(arr.slice(2,4)).to.eql(new Uint8Array([0x0,0xfe]));
    })

    it('test write int32 and uint32', () => {
      let writer = new BinaryWriter().SetBigEndian();
        let arr = writer.WriteInt32(-1)
          .WriteUInt32(254)
          .SetLittleEndian()
          .WriteUInt32(254)
          .WriteArray(new Uint8Array(5000))
          .toArray();
        expect(arr.byteLength).to.eq(5012);
        expect(arr.slice(0,4)).to.eql(new Uint8Array([0xff,0xff,0xff,0xff]));
        expect(arr.slice(4,8)).to.eql(new Uint8Array([0x0,0x0,0x0,0xfe]));
        expect(arr.slice(8,12)).to.eql(new Uint8Array([0xfe,0x0,0x0,0x0]));
    })
});