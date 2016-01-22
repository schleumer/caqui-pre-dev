export default (Ctor, val) => {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
}