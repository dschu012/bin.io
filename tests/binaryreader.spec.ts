import { BinaryReader } from '../src/binaryreader';
import { expect } from 'chai';
import { TextEncoder } from 'util';

describe('read binary data', () => {

  it('test read int8 and uint8', () => {
    let arr = new Uint8Array([0xff, 0xfe])
    let reader = new BinaryReader(arr);
    expect(reader.ReadInt8()).to.eq(-1);
    expect(reader.ReadUInt8()).to.eq(254);
  });

  it('test read int16 and uint16', () => {
    let arr = new Uint8Array([0xff, 0xff, 0xff, 0xfe]);
    let reader = new BinaryReader(arr).SetBigEndian();
    expect(reader.ReadInt16()).to.eq(-1);
    expect(reader.ReadUInt16()).to.eq(65534);
  })

  it('test read int32 and uint32', () => {
    let arr = new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe]);
    let reader = new BinaryReader(arr).SetBigEndian();
    expect(reader.ReadInt32()).to.eq(-1);
    expect(reader.ReadUInt32()).to.eq(4294967294);
  })

  it('test read null terminated string', () => {
    let str = `Hello 
      World!`;
    let reader = new BinaryReader(new TextEncoder().encode(`${str}\0`));
    expect(reader.ReadString()).to.eq(str);
  })

  it('test read string', () => {
    let str = `Hello 
      World!`;
    let reader = new BinaryReader(new TextEncoder().encode(str));
    expect(reader.ReadString(5)).to.eq(str.substring(0, 5));
    expect(reader.ReadString(5)).to.eq(str.substring(5, 10));
  })
  
});