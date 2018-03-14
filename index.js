var count = 0;
var dummyFunc = function() {};
var dummy = { update: dummyFunc, reverse: dummyFunc };

/**
 * Cpのインスタンスで管理されるNode Class。prevとnextでNode同士が連結される。
 * @class
 * @param {function} fc - Nodeに登録される関数
 * @param {Object} prev - The previous Node instance of this Node.
 * @param {Object} next - The next Node instance of this Node.
 */
var Node = function(fc, prev, next) {
  this.func = fc;
  this.prev = prev;
  this.next = next;
  this.available = false;
};
Node.prototype = {
  /**
   * this.funcを実行した上でnextに格納される次のNodeインスタンスをupdateする。
   * @memberof Node#
   * @param {Array} args - arguments for called function.
   */
  update: function(args) {
    this.func.apply(null, args || []);
    this.next.update(args);
  },

  /**
   * this.funcを実行した上でprevに格納される次のNodeインスタンスをreverseする。
   * 登録されている関数を逆順で実行する
   * @memberof Node#
   * @param {Array} args - arguments for called function.
   */
  reverse: function(args) {
    this.func.apply(null, args || []);
    this.prev.reverse(args);
  },

  /**
   * インスタンスをdeleteする。（メモリ解放）
   * @memberof Node#
   */
  release: function() {
    delete this.func;
    delete this.next;
    delete this.prev;
  }
};

/**
 * 登録された関数をfor statementを使わずに連続で実行する。
 * @class
 */
var Cp = function() {
  count += 1;
  this.id = count;
  this.index = 1;
  this.length = 0;
  this.first = new Node(dummyFunc, dummy, dummy);
  this.current = this.first;
  this.list = {};
};
Cp.prototype = {
  /**
   * 登録されている関数を順次実行します。
   * @memberof Cp
   * @param {Array} args - arguments for called function.
   */
  update: function(args) {
    if (this.first) this.first.update(args);
  },

  /**
   * 登録されている関数を逆順で実行します。
   * @memberof Cp
   * @param {Array} args - arguments for called function.
   */
  reverse: function(args) {
    if (this.current) this.current.reverse(args);
  },

  /**
   * インスタンスに関数を登録します。同じ関数は登録できません。
   * @memberof Cp
   * @param {function} fc - 登録される関数
   * @return {function} - 登録された関数を返します
   */
  add: function(fc) {
    var node, index;

    index = fc['__coupling__' + this.id];
    if (index) return;

    this.index += 1;
    index = fc['__coupling__' + this.id] = this.index;
    node = this.list[index] = new Node(fc, this.current, dummy);

    this.current.next = node;
    this.current = node;

    this.length += 1;
    return fc;
  },

  /**
   * 登録されている関数を削除します。
   * @memberof Cp
   * @param {function} fc - 登録されている関数
   */
  remove: function(fc) {
    var index = fc['__coupling__' + this.id];
    if (!index) return null;

    var node = this.list[index];
    node.prev.next = node.next;
    node.next.prev = node.prev;

    if (this.current === node) this.current = node.prev;
    this.length -= 1;

    delete this.list[index];
    delete fc['__coupling__' + this.id];
  },
};

module.exports = Cp;
