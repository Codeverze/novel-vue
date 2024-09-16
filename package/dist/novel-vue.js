import { defineComponent as fe, ref as H, onMounted as Et, onBeforeUnmount as Ti, h as he, getCurrentInstance as Mp, watchEffect as He, nextTick as fc, unref as ue, Teleport as Dp, shallowRef as pc, reactive as Oi, markRaw as _p, customRef as b0, getCurrentScope as v0, onScopeDispose as k0, readonly as x0, watch as Xn, onUnmounted as Qn, isReadonly as w0, toRefs as S0, openBlock as V, createElementBlock as re, normalizeClass as er, createElementVNode as J, inject as ft, Fragment as je, renderList as tr, createBlock as Te, resolveDynamicComponent as Mi, toDisplayString as xt, createCommentVNode as Ge, useAttrs as C0, computed as le, normalizeStyle as Rr, createVNode as Ye, createTextVNode as Au, cloneVNode as E0, provide as tn, withCtx as Un, withModifiers as A0 } from "vue";
function Ne(n) {
  this.content = n;
}
Ne.prototype = {
  constructor: Ne,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n)
        return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, o = r.find(n), s = r.content.slice();
    return o == -1 ? s.push(t || n, e) : (s[o + 1] = e, t && (s[o] = t)), new Ne(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1)
      return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Ne(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Ne([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Ne(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), o = r.content.slice(), s = r.find(n);
    return o.splice(s == -1 ? o.length : s, 0, e, t), new Ne(o);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = Ne.from(n), n.size ? new Ne(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Ne.from(n), n.size ? new Ne(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Ne.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
Ne.from = function(n) {
  if (n instanceof Ne)
    return n;
  var e = [];
  if (n)
    for (var t in n)
      e.push(t, n[t]);
  return new Ne(e);
};
function Np(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let o = n.child(r), s = e.child(r);
    if (o == s) {
      t += o.nodeSize;
      continue;
    }
    if (!o.sameMarkup(s))
      return t;
    if (o.isText && o.text != s.text) {
      for (let i = 0; o.text[i] == s.text[i]; i++)
        t++;
      return t;
    }
    if (o.content.size || s.content.size) {
      let i = Np(o.content, s.content, t + 1);
      if (i != null)
        return i;
    }
    t += o.nodeSize;
  }
}
function Rp(n, e, t, r) {
  for (let o = n.childCount, s = e.childCount; ; ) {
    if (o == 0 || s == 0)
      return o == s ? null : { a: t, b: r };
    let i = n.child(--o), a = e.child(--s), l = i.nodeSize;
    if (i == a) {
      t -= l, r -= l;
      continue;
    }
    if (!i.sameMarkup(a))
      return { a: t, b: r };
    if (i.isText && i.text != a.text) {
      let c = 0, u = Math.min(i.text.length, a.text.length);
      for (; c < u && i.text[i.text.length - c - 1] == a.text[a.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (i.content.size || a.content.size) {
      let c = Rp(i.content, a.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= l, r -= l;
  }
}
class M {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, o = 0, s) {
    for (let i = 0, a = 0; a < t; i++) {
      let l = this.content[i], c = a + l.nodeSize;
      if (c > e && r(l, o + a, s || null, i) !== !1 && l.content.size) {
        let u = a + 1;
        l.nodesBetween(Math.max(0, e - u), Math.min(l.content.size, t - u), r, o + u);
      }
      a = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, o) {
    let s = "", i = !0;
    return this.nodesBetween(e, t, (a, l) => {
      a.isText ? (s += a.text.slice(Math.max(e, l) - l, t - l), i = !r) : a.isLeaf ? (o ? s += typeof o == "function" ? o(a) : o : a.type.spec.leafText && (s += a.type.spec.leafText(a)), i = !r) : !i && a.isBlock && (s += r, i = !0);
    }, 0), s;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, o = this.content.slice(), s = 0;
    for (t.isText && t.sameMarkup(r) && (o[o.length - 1] = t.withText(t.text + r.text), s = 1); s < e.content.length; s++)
      o.push(e.content[s]);
    return new M(o, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], o = 0;
    if (t > e)
      for (let s = 0, i = 0; i < t; s++) {
        let a = this.content[s], l = i + a.nodeSize;
        l > e && ((i < e || l > t) && (a.isText ? a = a.cut(Math.max(0, e - i), Math.min(a.text.length, t - i)) : a = a.cut(Math.max(0, e - i - 1), Math.min(a.content.size, t - i - 1))), r.push(a), o += a.nodeSize), i = l;
      }
    return new M(r, o);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? M.empty : e == 0 && t == this.content.length ? this : new M(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let o = this.content.slice(), s = this.size + t.nodeSize - r.nodeSize;
    return o[e] = t, new M(o, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new M([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new M(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let o = this.content[t];
      e(o, r, t), r += o.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return Np(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Rp(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. (Not public.)
  */
  findIndex(e, t = -1) {
    if (e == 0)
      return hs(0, e);
    if (e == this.size)
      return hs(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, o = 0; ; r++) {
      let s = this.child(r), i = o + s.nodeSize;
      if (i >= e)
        return i == e || t > 0 ? hs(r + 1, i) : hs(r, o);
      o = i;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return M.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new M(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return M.empty;
    let t, r = 0;
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      r += s.nodeSize, o && s.isText && e[o - 1].sameMarkup(s) ? (t || (t = e.slice(0, o)), t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s);
    }
    return new M(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return M.empty;
    if (e instanceof M)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new M([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
M.empty = new M([], 0);
const ua = { index: 0, offset: 0 };
function hs(n, e) {
  return ua.index = n, ua.offset = e, ua;
}
function qs(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!qs(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !qs(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let oe = class fl {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        t || (t = e.slice(0, o));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (t || (t = e.slice(0, o)), t.push(this), r = !0), t && t.push(s);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && qs(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    return r.create(t.attrs);
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return fl.none;
    if (e instanceof fl)
      return [e];
    let t = e.slice();
    return t.sort((r, o) => r.type.rank - o.type.rank), t;
  }
};
oe.none = [];
class zs extends Error {
}
class R {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = Pp(this.content, e + this.openStart, t);
    return r && new R(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new R(Lp(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return R.empty;
    let r = t.openStart || 0, o = t.openEnd || 0;
    if (typeof r != "number" || typeof o != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new R(M.fromJSON(e, t.content), r, o);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, o = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
      o++;
    return new R(e, r, o);
  }
}
R.empty = new R(M.empty, 0, 0);
function Lp(n, e, t) {
  let { index: r, offset: o } = n.findIndex(e), s = n.maybeChild(r), { index: i, offset: a } = n.findIndex(t);
  if (o == e || s.isText) {
    if (a != t && !n.child(i).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != i)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, s.copy(Lp(s.content, e - o - 1, t - o - 1)));
}
function Pp(n, e, t, r) {
  let { index: o, offset: s } = n.findIndex(e), i = n.maybeChild(o);
  if (s == e || i.isText)
    return r && !r.canReplace(o, o, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = Pp(i.content, e - s - 1, t);
  return a && n.replaceChild(o, i.copy(a));
}
function T0(n, e, t) {
  if (t.openStart > n.depth)
    throw new zs("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new zs("Inconsistent open depths");
  return Ip(n, e, t, 0);
}
function Ip(n, e, t, r) {
  let o = n.index(r), s = n.node(r);
  if (o == e.index(r) && r < n.depth - t.openStart) {
    let i = Ip(n, e, t, r + 1);
    return s.copy(s.content.replaceChild(o, i));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let i = n.parent, a = i.content;
      return Kn(i, a.cut(0, n.parentOffset).append(t.content).append(a.cut(e.parentOffset)));
    } else {
      let { start: i, end: a } = O0(t, n);
      return Kn(s, Fp(n, i, a, e, r));
    }
  else
    return Kn(s, $s(n, e, r));
}
function Bp(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new zs("Cannot join " + e.type.name + " onto " + n.type.name);
}
function pl(n, e, t) {
  let r = n.node(t);
  return Bp(r, e.node(t)), r;
}
function Wn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function bo(n, e, t, r) {
  let o = (e || n).node(t), s = 0, i = e ? e.index(t) : o.childCount;
  n && (s = n.index(t), n.depth > t ? s++ : n.textOffset && (Wn(n.nodeAfter, r), s++));
  for (let a = s; a < i; a++)
    Wn(o.child(a), r);
  e && e.depth == t && e.textOffset && Wn(e.nodeBefore, r);
}
function Kn(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function Fp(n, e, t, r, o) {
  let s = n.depth > o && pl(n, e, o + 1), i = r.depth > o && pl(t, r, o + 1), a = [];
  return bo(null, n, o, a), s && i && e.index(o) == t.index(o) ? (Bp(s, i), Wn(Kn(s, Fp(n, e, t, r, o + 1)), a)) : (s && Wn(Kn(s, $s(n, e, o + 1)), a), bo(e, t, o, a), i && Wn(Kn(i, $s(t, r, o + 1)), a)), bo(r, null, o, a), new M(a);
}
function $s(n, e, t) {
  let r = [];
  if (bo(null, n, t, r), n.depth > t) {
    let o = pl(n, e, t + 1);
    Wn(Kn(o, $s(n, e, t + 1)), r);
  }
  return bo(e, null, t, r), new M(r);
}
function O0(n, e) {
  let t = e.depth - n.openStart, o = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--)
    o = e.node(s).copy(M.from(o));
  return {
    start: o.resolveNoCache(n.openStart + t),
    end: o.resolveNoCache(o.content.size - n.openEnd - t)
  };
}
class _o {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], o = e.child(t);
    return r ? e.child(t).cut(r) : o;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], o = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      o += r.child(s).nodeSize;
    return o;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return oe.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), o = e.maybeChild(t);
    if (!r) {
      let a = r;
      r = o, o = a;
    }
    let s = r.marks;
    for (var i = 0; i < s.length; i++)
      s[i].type.spec.inclusive === !1 && (!o || !s[i].isInSet(o.marks)) && (s = s[i--].removeFromSet(s));
    return s;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, o = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!o || !r[s].isInSet(o.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new Hs(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], o = 0, s = t;
    for (let i = e; ; ) {
      let { index: a, offset: l } = i.content.findIndex(s), c = s - l;
      if (r.push(i, a, o + l), !c || (i = i.child(a), i.isText))
        break;
      s = c - 1, o += l + 1;
    }
    return new _o(t, r, s);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    for (let o = 0; o < da.length; o++) {
      let s = da[o];
      if (s.pos == t && s.doc == e)
        return s;
    }
    let r = da[fa] = _o.resolve(e, t);
    return fa = (fa + 1) % M0, r;
  }
}
let da = [], fa = 0, M0 = 12;
class Hs {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const D0 = /* @__PURE__ */ Object.create(null);
let Jn = class hl {
  /**
  @internal
  */
  constructor(e, t, r, o = oe.none) {
    this.type = e, this.attrs = t, this.marks = o, this.content = r || M.empty;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, o = 0) {
    this.content.nodesBetween(e, t, r, o, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
  */
  textBetween(e, t, r, o) {
    return this.content.textBetween(e, t, r, o);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && qs(this.attrs, t || e.defaultAttrs || D0) && oe.sameSet(this.marks, r || oe.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new hl(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new hl(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return R.empty;
    let o = this.resolve(e), s = this.resolve(t), i = r ? 0 : o.sharedDepth(t), a = o.start(i), c = o.node(i).content.cut(o.pos - a, s.pos - a);
    return new R(c, o.depth - i, s.depth - i);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return T0(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: o } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (o == e || t.isText)
        return t;
      e -= o + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let o = this.content.child(t - 1);
    return { node: o, index: t - 1, offset: r - o.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return _o.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return _o.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let o = !1;
    return t > e && this.nodesBetween(e, t, (s) => (r.isInSet(s.marks) && (o = !0), !o)), o;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), qp(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = M.empty, o = 0, s = r.childCount) {
    let i = this.contentMatchAt(e).matchFragment(r, o, s), a = i && i.matchFragment(this.content, t);
    if (!a || !a.validEnd)
      return !1;
    for (let l = o; l < s; l++)
      if (!this.type.allowsMarks(r.child(l).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, o) {
    if (o && !this.type.allowsMarks(o))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), i = s && s.matchFragment(this.content, t);
    return i ? i.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise error when they do not.
  */
  check() {
    this.type.checkContent(this.content);
    let e = oe.none;
    for (let t = 0; t < this.marks.length; t++)
      e = this.marks[t].addToSet(e);
    if (!oe.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r = null;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let o = M.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, o, r);
  }
};
Jn.prototype.text = void 0;
class js extends Jn {
  /**
  @internal
  */
  constructor(e, t, r, o) {
    if (super(e, t, null, o), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : qp(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new js(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new js(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function qp(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class nr {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new _0(e, t);
    if (r.next == null)
      return nr.empty;
    let o = zp(r);
    r.next && r.err("Unexpected trailing text");
    let s = F0(B0(o));
    return q0(s, r), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let o = this;
    for (let s = t; o && s < r; s++)
      o = o.matchType(e.child(s).type);
    return o;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let o = [this];
    function s(i, a) {
      let l = i.matchFragment(e, r);
      if (l && (!t || l.validEnd))
        return M.from(a.map((c) => c.createAndFill()));
      for (let c = 0; c < i.next.length; c++) {
        let { type: u, next: d } = i.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && o.indexOf(d) == -1) {
          o.push(d);
          let f = s(d, a.concat(u));
          if (f)
            return f;
        }
      }
      return null;
    }
    return s(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let o = r.shift(), s = o.match;
      if (s.matchType(e)) {
        let i = [];
        for (let a = o; a.type; a = a.via)
          i.push(a.type);
        return i.reverse();
      }
      for (let i = 0; i < s.next.length; i++) {
        let { type: a, next: l } = s.next[i];
        !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!o.type || l.validEnd) && (r.push({ match: a.contentMatch, type: a, via: o }), t[a.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let o = 0; o < r.next.length; o++)
        e.indexOf(r.next[o].next) == -1 && t(r.next[o].next);
    }
    return t(this), e.map((r, o) => {
      let s = o + (r.validEnd ? "*" : " ") + " ";
      for (let i = 0; i < r.next.length; i++)
        s += (i ? ", " : "") + r.next[i].type.name + "->" + e.indexOf(r.next[i].next);
      return s;
    }).join(`
`);
  }
}
nr.empty = new nr(!0);
class _0 {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function zp(n) {
  let e = [];
  do
    e.push(N0(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function N0(n) {
  let e = [];
  do
    e.push(R0(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function R0(n) {
  let e = I0(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = L0(n, e);
    else
      break;
  return e;
}
function Tu(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function L0(n, e) {
  let t = Tu(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Tu(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function P0(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let o = [];
  for (let s in t) {
    let i = t[s];
    i.groups.indexOf(e) > -1 && o.push(i);
  }
  return o.length == 0 && n.err("No node type or group '" + e + "' found"), o;
}
function I0(n) {
  if (n.eat("(")) {
    let e = zp(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = P0(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function B0(n) {
  let e = [[]];
  return o(s(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(i, a, l) {
    let c = { term: l, to: a };
    return e[i].push(c), c;
  }
  function o(i, a) {
    i.forEach((l) => l.to = a);
  }
  function s(i, a) {
    if (i.type == "choice")
      return i.exprs.reduce((l, c) => l.concat(s(c, a)), []);
    if (i.type == "seq")
      for (let l = 0; ; l++) {
        let c = s(i.exprs[l], a);
        if (l == i.exprs.length - 1)
          return c;
        o(c, a = t());
      }
    else if (i.type == "star") {
      let l = t();
      return r(a, l), o(s(i.expr, l), l), [r(l)];
    } else if (i.type == "plus") {
      let l = t();
      return o(s(i.expr, a), l), o(s(i.expr, l), l), [r(l)];
    } else {
      if (i.type == "opt")
        return [r(a)].concat(s(i.expr, a));
      if (i.type == "range") {
        let l = a;
        for (let c = 0; c < i.min; c++) {
          let u = t();
          o(s(i.expr, l), u), l = u;
        }
        if (i.max == -1)
          o(s(i.expr, l), l);
        else
          for (let c = i.min; c < i.max; c++) {
            let u = t();
            r(l, u), o(s(i.expr, l), u), l = u;
          }
        return [r(l)];
      } else {
        if (i.type == "name")
          return [r(a, void 0, i.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function $p(n, e) {
  return e - n;
}
function Ou(n, e) {
  let t = [];
  return r(e), t.sort($p);
  function r(o) {
    let s = n[o];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    t.push(o);
    for (let i = 0; i < s.length; i++) {
      let { term: a, to: l } = s[i];
      !a && t.indexOf(l) == -1 && r(l);
    }
  }
}
function F0(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Ou(n, 0));
  function t(r) {
    let o = [];
    r.forEach((i) => {
      n[i].forEach(({ term: a, to: l }) => {
        if (!a)
          return;
        let c;
        for (let u = 0; u < o.length; u++)
          o[u][0] == a && (c = o[u][1]);
        Ou(n, l).forEach((u) => {
          c || o.push([a, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[r.join(",")] = new nr(r.indexOf(n.length - 1) > -1);
    for (let i = 0; i < o.length; i++) {
      let a = o[i][1].sort($p);
      s.next.push({ type: o[i][0], next: e[a.join(",")] || t(a) });
    }
    return s;
  }
}
function q0(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let o = r[t], s = !o.validEnd, i = [];
    for (let a = 0; a < o.next.length; a++) {
      let { type: l, next: c } = o.next[a];
      i.push(l.name), s && !(l.isText || l.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + i.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Hp(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function jp(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let o = e && e[r];
    if (o === void 0) {
      let s = n[r];
      if (s.hasDefault)
        o = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = o;
  }
  return t;
}
function Vp(n) {
  let e = /* @__PURE__ */ Object.create(null);
  if (n)
    for (let t in n)
      e[t] = new z0(n[t]);
  return e;
}
let Mu = class Up {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Vp(r.attrs), this.defaultAttrs = Hp(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == nr.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : jp(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Jn(this, this.computeAttrs(e), M.from(t), oe.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = M.from(t), this.checkContent(t), new Jn(this, this.computeAttrs(e), t, oe.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = M.from(t), t.size) {
      let i = this.contentMatch.fillBefore(t);
      if (!i)
        return null;
      t = i.append(t);
    }
    let o = this.contentMatch.matchFragment(t), s = o && o.fillBefore(M.empty, !0);
    return s ? new Jn(this, e, t.append(s), oe.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type with the given attributes.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : oe.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, i) => r[s] = new Up(s, t, i));
    let o = t.spec.topNode || "doc";
    if (!r[o])
      throw new RangeError("Schema is missing its top node type ('" + o + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
class z0 {
  constructor(e) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(e, "default"), this.default = e.default;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Di {
  /**
  @internal
  */
  constructor(e, t, r, o) {
    this.name = e, this.rank = t, this.schema = r, this.spec = o, this.attrs = Vp(o.attrs), this.excluded = null;
    let s = Hp(this.attrs);
    this.instance = s ? new oe(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new oe(this, jp(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), o = 0;
    return e.forEach((s, i) => r[s] = new Di(s, o++, t, i)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class Wp {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let o in e)
      t[o] = e[o];
    t.nodes = Ne.from(e.nodes), t.marks = Ne.from(e.marks || {}), this.nodes = Mu.compile(this.spec.nodes, this), this.marks = Di.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in this.nodes) {
      if (o in this.marks)
        throw new RangeError(o + " can not be both a node and a mark");
      let s = this.nodes[o], i = s.spec.content || "", a = s.spec.marks;
      s.contentMatch = r[i] || (r[i] = nr.parse(i, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.markSet = a == "_" ? null : a ? Du(this, a.split(" ")) : a == "" || !s.inlineContent ? [] : null;
    }
    for (let o in this.marks) {
      let s = this.marks[o], i = s.spec.excludes;
      s.excluded = i == null ? [s] : i == "" ? [] : Du(this, i.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, o) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Mu) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else
      throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, o);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new js(r, r.defaultAttrs, e, oe.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  Deserialize a node from its JSON representation. This method is
  bound.
  */
  nodeFromJSON(e) {
    return Jn.fromJSON(this, e);
  }
  /**
  Deserialize a mark from its JSON representation. This method is
  bound.
  */
  markFromJSON(e) {
    return oe.fromJSON(this, e);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function Du(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let o = e[r], s = n.marks[o], i = s;
    if (s)
      t.push(s);
    else
      for (let a in n.marks) {
        let l = n.marks[a];
        (o == "_" || l.spec.group && l.spec.group.split(" ").indexOf(o) > -1) && t.push(i = l);
      }
    if (!i)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
class rr {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [], t.forEach((r) => {
      r.tag ? this.tags.push(r) : r.style && this.styles.push(r);
    }), this.normalizeLists = !this.tags.some((r) => {
      if (!/^(ul|ol)\b/.test(r.tag) || !r.node)
        return !1;
      let o = e.nodes[r.node];
      return o.contentMatch.matchType(o);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new Nu(this, t, !1);
    return r.addAll(e, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new Nu(this, t, !0);
    return r.addAll(e, t.from, t.to), R.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let o = r ? this.tags.indexOf(r) + 1 : 0; o < this.tags.length; o++) {
      let s = this.tags[o];
      if (j0(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
        if (s.getAttrs) {
          let i = s.getAttrs(e);
          if (i === !1)
            continue;
          s.attrs = i || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, o) {
    for (let s = o ? this.styles.indexOf(o) + 1 : 0; s < this.styles.length; s++) {
      let i = this.styles[s], a = i.style;
      if (!(a.indexOf(e) != 0 || i.context && !r.matchesContext(i.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
        if (i.getAttrs) {
          let l = i.getAttrs(t);
          if (l === !1)
            continue;
          i.attrs = l || void 0;
        }
        return i;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(o) {
      let s = o.priority == null ? 50 : o.priority, i = 0;
      for (; i < t.length; i++) {
        let a = t[i];
        if ((a.priority == null ? 50 : a.priority) < s)
          break;
      }
      t.splice(i, 0, o);
    }
    for (let o in e.marks) {
      let s = e.marks[o].spec.parseDOM;
      s && s.forEach((i) => {
        r(i = Ru(i)), i.mark || i.ignore || i.clearMark || (i.mark = o);
      });
    }
    for (let o in e.nodes) {
      let s = e.nodes[o].spec.parseDOM;
      s && s.forEach((i) => {
        r(i = Ru(i)), i.node || i.ignore || i.mark || (i.node = o);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new rr(e, rr.schemaRules(e)));
  }
}
const Kp = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, $0 = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Jp = { ol: !0, ul: !0 }, Vs = 1, Us = 2, vo = 4;
function _u(n, e, t) {
  return e != null ? (e ? Vs : 0) | (e === "full" ? Us : 0) : n && n.whitespace == "pre" ? Vs | Us : t & ~vo;
}
class ms {
  constructor(e, t, r, o, s, i, a) {
    this.type = e, this.attrs = t, this.marks = r, this.pendingMarks = o, this.solid = s, this.options = a, this.content = [], this.activeMarks = oe.none, this.stashMarks = [], this.match = i || (a & vo ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(M.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, o;
        return (o = r.findWrapping(e.type)) ? (this.match = r, o) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Vs)) {
      let r = this.content[this.content.length - 1], o;
      if (r && r.isText && (o = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == o[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - o[0].length));
      }
    }
    let t = M.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(M.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  popFromStashMark(e) {
    for (let t = this.stashMarks.length - 1; t >= 0; t--)
      if (e.eq(this.stashMarks[t]))
        return this.stashMarks.splice(t, 1)[0];
  }
  applyPending(e) {
    for (let t = 0, r = this.pendingMarks; t < r.length; t++) {
      let o = r[t];
      (this.type ? this.type.allowsMarkType(o.type) : U0(o.type, e)) && !o.isInSet(this.activeMarks) && (this.activeMarks = o.addToSet(this.activeMarks), this.pendingMarks = o.removeFromSet(this.pendingMarks));
    }
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Kp.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Nu {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0;
    let o = t.topNode, s, i = _u(null, t.preserveWhitespace, 0) | (r ? vo : 0);
    o ? s = new ms(o.type, o.attrs, oe.none, oe.none, !0, t.topMatch || o.type.contentMatch, i) : r ? s = new ms(null, null, oe.none, oe.none, !0, null, i) : s = new ms(e.schema.topNodeType, null, oe.none, oe.none, !0, null, i), this.nodes = [s], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e) {
    e.nodeType == 3 ? this.addTextNode(e) : e.nodeType == 1 && this.addElement(e);
  }
  withStyleRules(e, t) {
    let r = e.getAttribute("style");
    if (!r)
      return t();
    let o = this.readStyles(V0(r));
    if (!o)
      return;
    let [s, i] = o, a = this.top;
    for (let l = 0; l < i.length; l++)
      this.removePendingMark(i[l], a);
    for (let l = 0; l < s.length; l++)
      this.addPendingMark(s[l]);
    t();
    for (let l = 0; l < s.length; l++)
      this.removePendingMark(s[l], a);
    for (let l = 0; l < i.length; l++)
      this.addPendingMark(i[l]);
  }
  addTextNode(e) {
    let t = e.nodeValue, r = this.top;
    if (r.options & Us || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(t)) {
      if (r.options & Vs)
        r.options & Us ? t = t.replace(/\r\n?/g, `
`) : t = t.replace(/\r?\n|\r/g, " ");
      else if (t = t.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(t) && this.open == this.nodes.length - 1) {
        let o = r.content[r.content.length - 1], s = e.previousSibling;
        (!o || s && s.nodeName == "BR" || o.isText && /[ \t\r\n\u000c]$/.test(o.text)) && (t = t.slice(1));
      }
      t && this.insertNode(this.parser.schema.text(t)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t) {
    let r = e.nodeName.toLowerCase(), o;
    Jp.hasOwnProperty(r) && this.parser.normalizeLists && H0(e);
    let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, t));
    if (s ? s.ignore : $0.hasOwnProperty(r))
      this.findInside(e), this.ignoreFallback(e);
    else if (!s || s.skip || s.closeParent) {
      s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
      let i, a = this.top, l = this.needsBlock;
      if (Kp.hasOwnProperty(r))
        a.content.length && a.content[0].isInline && this.open && (this.open--, a = this.top), i = !0, a.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e);
        return;
      }
      s && s.skip ? this.addAll(e) : this.withStyleRules(e, () => this.addAll(e)), i && this.sync(a), this.needsBlock = l;
    } else
      this.withStyleRules(e, () => {
        this.addElementByRule(e, s, s.consuming === !1 ? o : void 0);
      });
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`));
  }
  // Called for ignored nodes
  ignoreFallback(e) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"));
  }
  // Run any style parser associated with the node's styles. Either
  // return an array of marks, or null to indicate some of the styles
  // had a rule with `ignore` set.
  readStyles(e) {
    let t = oe.none, r = oe.none;
    for (let o = 0; o < e.length; o += 2)
      for (let s = void 0; ; ) {
        let i = this.parser.matchStyle(e[o], e[o + 1], this, s);
        if (!i)
          break;
        if (i.ignore)
          return null;
        if (i.clearMark ? this.top.pendingMarks.concat(this.top.activeMarks).forEach((a) => {
          i.clearMark(a) && (r = a.addToSet(r));
        }) : t = this.parser.schema.marks[i.mark].create(i.attrs).addToSet(t), i.consuming === !1)
          s = i;
        else
          break;
      }
    return [t, r];
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r) {
    let o, s, i;
    t.node ? (s = this.parser.schema.nodes[t.node], s.isLeaf ? this.insertNode(s.create(t.attrs)) || this.leafFallback(e) : o = this.enter(s, t.attrs || null, t.preserveWhitespace)) : (i = this.parser.schema.marks[t.mark].create(t.attrs), this.addPendingMark(i));
    let a = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (r)
      this.addElement(e, r);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((l) => this.insertNode(l));
    else {
      let l = e;
      typeof t.contentElement == "string" ? l = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? l = t.contentElement(e) : t.contentElement && (l = t.contentElement), this.findAround(e, l, !0), this.addAll(l);
    }
    o && this.sync(a) && this.open--, i && this.removePendingMark(i, a);
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r) {
    let o = t || 0;
    for (let s = t ? e.childNodes[t] : e.firstChild, i = r == null ? null : e.childNodes[r]; s != i; s = s.nextSibling, ++o)
      this.findAtPoint(e, o), this.addDOM(s);
    this.findAtPoint(e, o);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e) {
    let t, r;
    for (let o = this.open; o >= 0; o--) {
      let s = this.nodes[o], i = s.findWrapping(e);
      if (i && (!t || t.length > i.length) && (t = i, r = s, !i.length) || s.solid)
        break;
    }
    if (!t)
      return !1;
    this.sync(r);
    for (let o = 0; o < t.length; o++)
      this.enterInner(t[o], null, !1);
    return !0;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let t = this.textblockFromContext();
      t && this.enterInner(t);
    }
    if (this.findPlace(e)) {
      this.closeExtra();
      let t = this.top;
      t.applyPending(e.type), t.match && (t.match = t.match.matchType(e.type));
      let r = t.activeMarks;
      for (let o = 0; o < e.marks.length; o++)
        (!t.type || t.type.allowsMarkType(e.marks[o].type)) && (r = e.marks[o].addToSet(r));
      return t.content.push(e.mark(r)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r) {
    let o = this.findPlace(e.create(t));
    return o && this.enterInner(e, t, !0, r), o;
  }
  // Open a node of the given type
  enterInner(e, t = null, r = !1, o) {
    this.closeExtra();
    let s = this.top;
    s.applyPending(e), s.match = s.match && s.match.matchType(e);
    let i = _u(e, o, s.options);
    s.options & vo && s.content.length == 0 && (i |= vo), this.nodes.push(new ms(e, t, s.activeMarks, s.pendingMarks, r, null, i)), this.open++;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--)
      if (this.nodes[t] == e)
        return this.open = t, !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let o = r.length - 1; o >= 0; o--)
        e += r[o].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let o = 0; o < this.find.length; o++)
        this.find[o].pos == null && e.nodeType == 1 && e.contains(this.find[o].node) && t.compareDocumentPosition(this.find[o].node) & (r ? 2 : 4) && (this.find[o].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, o = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (o ? 0 : 1), i = (a, l) => {
      for (; a >= 0; a--) {
        let c = t[a];
        if (c == "") {
          if (a == t.length - 1 || a == 0)
            continue;
          for (; l >= s; l--)
            if (i(a - 1, l))
              return !0;
          return !1;
        } else {
          let u = l > 0 || l == 0 && o ? this.nodes[l].type : r && l >= s ? r.node(l - s).type : null;
          if (!u || u.name != c && u.groups.indexOf(c) == -1)
            return !1;
          l--;
        }
      }
      return !0;
    };
    return i(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
  addPendingMark(e) {
    let t = W0(e, this.top.pendingMarks);
    t && this.top.stashMarks.push(t), this.top.pendingMarks = e.addToSet(this.top.pendingMarks);
  }
  removePendingMark(e, t) {
    for (let r = this.open; r >= 0; r--) {
      let o = this.nodes[r];
      if (o.pendingMarks.lastIndexOf(e) > -1)
        o.pendingMarks = e.removeFromSet(o.pendingMarks);
      else {
        o.activeMarks = e.removeFromSet(o.activeMarks);
        let i = o.popFromStashMark(e);
        i && o.type && o.type.allowsMarkType(i.type) && (o.activeMarks = i.addToSet(o.activeMarks));
      }
      if (o == t)
        break;
    }
  }
}
function H0(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Jp.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function j0(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function V0(n) {
  let e = /\s*([\w-]+)\s*:\s*([^;]+)/g, t, r = [];
  for (; t = e.exec(n); )
    r.push(t[1], t[2].trim());
  return r;
}
function Ru(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function U0(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let o = t[r];
    if (!o.allowsMarkType(n))
      continue;
    let s = [], i = (a) => {
      s.push(a);
      for (let l = 0; l < a.edgeCount; l++) {
        let { type: c, next: u } = a.edge(l);
        if (c == e || s.indexOf(u) < 0 && i(u))
          return !0;
      }
    };
    if (i(o.contentMatch))
      return !0;
  }
}
function W0(n, e) {
  for (let t = 0; t < e.length; t++)
    if (n.eq(e[t]))
      return e[t];
}
class Pt {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = pa(t).createDocumentFragment());
    let o = r, s = [];
    return e.forEach((i) => {
      if (s.length || i.marks.length) {
        let a = 0, l = 0;
        for (; a < s.length && l < i.marks.length; ) {
          let c = i.marks[l];
          if (!this.marks[c.type.name]) {
            l++;
            continue;
          }
          if (!c.eq(s[a][0]) || c.type.spec.spanning === !1)
            break;
          a++, l++;
        }
        for (; a < s.length; )
          o = s.pop()[1];
        for (; l < i.marks.length; ) {
          let c = i.marks[l++], u = this.serializeMark(c, i.isInline, t);
          u && (s.push([c, o]), o.appendChild(u.dom), o = u.contentDOM || u.dom);
        }
      }
      o.appendChild(this.serializeNodeInner(i, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: o } = Pt.renderSpec(pa(t), this.nodes[e.type.name](e));
    if (o) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, o);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let o = e.marks.length - 1; o >= 0; o--) {
      let s = this.serializeMark(e.marks[o], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let o = this.marks[e.type.name];
    return o && Pt.renderSpec(pa(r), o(e, t));
  }
  /**
  Render an [output spec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec) to a DOM node. If
  the spec has a hole (zero) in it, `contentDOM` will point at the
  node with the hole.
  */
  static renderSpec(e, t, r = null) {
    if (typeof t == "string")
      return { dom: e.createTextNode(t) };
    if (t.nodeType != null)
      return { dom: t };
    if (t.dom && t.dom.nodeType != null)
      return t;
    let o = t[0], s = o.indexOf(" ");
    s > 0 && (r = o.slice(0, s), o = o.slice(s + 1));
    let i, a = r ? e.createElementNS(r, o) : e.createElement(o), l = t[1], c = 1;
    if (l && typeof l == "object" && l.nodeType == null && !Array.isArray(l)) {
      c = 2;
      for (let u in l)
        if (l[u] != null) {
          let d = u.indexOf(" ");
          d > 0 ? a.setAttributeNS(u.slice(0, d), u.slice(d + 1), l[u]) : a.setAttribute(u, l[u]);
        }
    }
    for (let u = c; u < t.length; u++) {
      let d = t[u];
      if (d === 0) {
        if (u < t.length - 1 || u > c)
          throw new RangeError("Content hole must be the only child of its parent node");
        return { dom: a, contentDOM: a };
      } else {
        let { dom: f, contentDOM: p } = Pt.renderSpec(e, d, r);
        if (a.appendChild(f), p) {
          if (i)
            throw new RangeError("Multiple content holes");
          i = p;
        }
      }
    }
    return { dom: a, contentDOM: i };
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new Pt(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = Lu(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Lu(e.marks);
  }
}
function Lu(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function pa(n) {
  return n.document || window.document;
}
const Gp = 65535, Zp = Math.pow(2, 16);
function K0(n, e) {
  return n + e * Zp;
}
function Pu(n) {
  return n & Gp;
}
function J0(n) {
  return (n - (n & Gp)) / Zp;
}
const Yp = 1, Xp = 2, Ds = 4, Qp = 8;
class ml {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Qp) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Yp | Ds)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Xp | Ds)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Ds) > 0;
  }
}
class dt {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && dt.empty)
      return dt.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Pu(e);
    if (!this.inverted)
      for (let o = 0; o < r; o++)
        t += this.ranges[o * 3 + 2] - this.ranges[o * 3 + 1];
    return this.ranges[r * 3] + t + J0(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let o = 0, s = this.inverted ? 2 : 1, i = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? o : 0);
      if (l > e)
        break;
      let c = this.ranges[a + s], u = this.ranges[a + i], d = l + c;
      if (e <= d) {
        let f = c ? e == l ? -1 : e == d ? 1 : t : t, p = l + o + (f < 0 ? 0 : u);
        if (r)
          return p;
        let h = e == (t < 0 ? l : d) ? null : K0(a / 3, e - l), m = e == l ? Xp : e == d ? Yp : Ds;
        return (t < 0 ? e != l : e != d) && (m |= Qp), new ml(p, m, h);
      }
      o += u - c;
    }
    return r ? e + o : new ml(e + o, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, o = Pu(t), s = this.inverted ? 2 : 1, i = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? r : 0);
      if (l > e)
        break;
      let c = this.ranges[a + s], u = l + c;
      if (e <= u && a == o * 3)
        return !0;
      r += this.ranges[a + i] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let o = 0, s = 0; o < this.ranges.length; o += 3) {
      let i = this.ranges[o], a = i - (this.inverted ? s : 0), l = i + (this.inverted ? 0 : s), c = this.ranges[o + t], u = this.ranges[o + r];
      e(a, a + c, l, l + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new dt(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? dt.empty : new dt(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
dt.empty = new dt([]);
class Lr {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e = [], t, r = 0, o = e.length) {
    this.maps = e, this.mirror = t, this.from = r, this.to = o;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new Lr(this.maps, this.mirror, e, t);
  }
  /**
  @internal
  */
  copy() {
    return new Lr(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.to = this.maps.push(e), t != null && this.setMirror(this.maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this.maps.length; t < e.maps.length; t++) {
      let o = e.getMirror(t);
      this.appendMap(e.maps[t], o != null && o < t ? r + o : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this.maps.length + e.maps.length; t >= 0; t--) {
      let o = e.getMirror(t);
      this.appendMap(e.maps[t].invert(), o != null && o > t ? r - o - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new Lr();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this.maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let o = 0;
    for (let s = this.from; s < this.to; s++) {
      let i = this.maps[s], a = i.mapResult(e, t);
      if (a.recover != null) {
        let l = this.getMirror(s);
        if (l != null && l > s && l < this.to) {
          s = l, e = this.maps[l].recover(a.recover);
          continue;
        }
      }
      o |= a.delInfo, e = a.pos;
    }
    return r ? e : new ml(e, o, null);
  }
}
const ha = /* @__PURE__ */ Object.create(null);
class nt {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return dt.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = ha[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in ha)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return ha[e] = t, t.prototype.jsonID = e, t;
  }
}
class we {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new we(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new we(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, o) {
    try {
      return we.ok(e.replace(t, r, o));
    } catch (s) {
      if (s instanceof zs)
        return we.fail(s.message);
      throw s;
    }
  }
}
function hc(n, e, t) {
  let r = [];
  for (let o = 0; o < n.childCount; o++) {
    let s = n.child(o);
    s.content.size && (s = s.copy(hc(s.content, e, s))), s.isInline && (s = e(s, t, o)), r.push(s);
  }
  return M.fromArray(r);
}
class yn extends nt {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), o = r.node(r.sharedDepth(this.to)), s = new R(hc(t.content, (i, a) => !i.isAtom || !a.type.allowsMarkType(this.mark.type) ? i : i.mark(this.mark.addToSet(i.marks)), o), t.openStart, t.openEnd);
    return we.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new It(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new yn(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof yn && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new yn(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new yn(t.from, t.to, e.markFromJSON(t.mark));
  }
}
nt.jsonID("addMark", yn);
class It extends nt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new R(hc(t.content, (o) => o.mark(this.mark.removeFromSet(o.marks)), e), t.openStart, t.openEnd);
    return we.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new yn(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new It(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof It && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new It(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new It(t.from, t.to, e.markFromJSON(t.mark));
  }
}
nt.jsonID("removeMark", It);
class bn extends nt {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return we.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return we.fromReplace(e, this.pos, this.pos + 1, new R(M.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let o = 0; o < t.marks.length; o++)
          if (!t.marks[o].isInSet(r))
            return new bn(this.pos, t.marks[o]);
        return new bn(this.pos, this.mark);
      }
    }
    return new zr(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new bn(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new bn(t.pos, e.markFromJSON(t.mark));
  }
}
nt.jsonID("addNodeMark", bn);
class zr extends nt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return we.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return we.fromReplace(e, this.pos, this.pos + 1, new R(M.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new bn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new zr(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new zr(t.pos, e.markFromJSON(t.mark));
  }
}
nt.jsonID("removeNodeMark", zr);
class Re extends nt {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, o = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = o;
  }
  apply(e) {
    return this.structure && gl(e, this.from, this.to) ? we.fail("Structure replace would overwrite content") : we.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new dt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new Re(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new Re(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof Re) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? R.empty : new R(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Re(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? R.empty : new R(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new Re(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new Re(t.from, t.to, R.fromJSON(e, t.slice), !!t.structure);
  }
}
nt.jsonID("replace", Re);
class Oe extends nt {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, o, s, i, a = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = o, this.slice = s, this.insert = i, this.structure = a;
  }
  apply(e) {
    if (this.structure && (gl(e, this.from, this.gapFrom) || gl(e, this.gapTo, this.to)))
      return we.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return we.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? we.fromReplace(e, this.from, this.to, r) : we.fail("Content does not fit in gap");
  }
  getMap() {
    return new dt([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new Oe(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), o = e.map(this.gapFrom, -1), s = e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || o < t.pos || s > r.pos ? null : new Oe(t.pos, r.pos, o, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new Oe(t.from, t.to, t.gapFrom, t.gapTo, R.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
nt.jsonID("replaceAround", Oe);
function gl(n, e, t) {
  let r = n.resolve(e), o = t - e, s = r.depth;
  for (; o > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; )
    s--, o--;
  if (o > 0) {
    let i = r.node(s).maybeChild(r.indexAfter(s));
    for (; o > 0; ) {
      if (!i || i.isLeaf)
        return !0;
      i = i.firstChild, o--;
    }
  }
  return !1;
}
function G0(n, e, t, r) {
  let o = [], s = [], i, a;
  n.doc.nodesBetween(e, t, (l, c, u) => {
    if (!l.isInline)
      return;
    let d = l.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), p = Math.min(c + l.nodeSize, t), h = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(h) || (i && i.to == f && i.mark.eq(d[m]) ? i.to = p : o.push(i = new It(f, p, d[m])));
      a && a.to == f ? a.to = p : s.push(a = new yn(f, p, r));
    }
  }), o.forEach((l) => n.step(l)), s.forEach((l) => n.step(l));
}
function Z0(n, e, t, r) {
  let o = [], s = 0;
  n.doc.nodesBetween(e, t, (i, a) => {
    if (!i.isInline)
      return;
    s++;
    let l = null;
    if (r instanceof Di) {
      let c = i.marks, u;
      for (; u = r.isInSet(c); )
        (l || (l = [])).push(u), c = u.removeFromSet(c);
    } else
      r ? r.isInSet(i.marks) && (l = [r]) : l = i.marks;
    if (l && l.length) {
      let c = Math.min(a + i.nodeSize, t);
      for (let u = 0; u < l.length; u++) {
        let d = l[u], f;
        for (let p = 0; p < o.length; p++) {
          let h = o[p];
          h.step == s - 1 && d.eq(o[p].style) && (f = h);
        }
        f ? (f.to = c, f.step = s) : o.push({ style: d, from: Math.max(a, e), to: c, step: s });
      }
    }
  }), o.forEach((i) => n.step(new It(i.from, i.to, i.style)));
}
function Y0(n, e, t, r = t.contentMatch) {
  let o = n.doc.nodeAt(e), s = [], i = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let l = o.child(a), c = i + l.nodeSize, u = r.matchType(l.type);
    if (!u)
      s.push(new Re(i, c, R.empty));
    else {
      r = u;
      for (let d = 0; d < l.marks.length; d++)
        t.allowsMarkType(l.marks[d].type) || n.step(new It(i, c, l.marks[d]));
      if (l.isText && !t.spec.code) {
        let d, f = /\r?\n|\r/g, p;
        for (; d = f.exec(l.text); )
          p || (p = new R(M.from(t.schema.text(" ", t.allowedMarks(l.marks))), 0, 0)), s.push(new Re(i + d.index, i + d.index + d[0].length, p));
      }
    }
    i = c;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(M.empty, !0);
    n.replace(i, i, new R(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function X0(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Xr(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let o = n.$from.node(r), s = n.$from.index(r), i = n.$to.indexAfter(r);
    if (r < n.depth && o.canReplace(s, i, t))
      return r;
    if (r == 0 || o.type.spec.isolating || !X0(o, s, i))
      break;
  }
  return null;
}
function Q0(n, e, t) {
  let { $from: r, $to: o, depth: s } = e, i = r.before(s + 1), a = o.after(s + 1), l = i, c = a, u = M.empty, d = 0;
  for (let h = s, m = !1; h > t; h--)
    m || r.index(h) > 0 ? (m = !0, u = M.from(r.node(h).copy(u)), d++) : l--;
  let f = M.empty, p = 0;
  for (let h = s, m = !1; h > t; h--)
    m || o.after(h + 1) < o.end(h) ? (m = !0, f = M.from(o.node(h).copy(f)), p++) : c++;
  n.step(new Oe(l, c, i, a, new R(u.append(f), d, p), u.size - d, !0));
}
function mc(n, e, t = null, r = n) {
  let o = ey(n, e), s = o && ty(r, e);
  return s ? o.map(Iu).concat({ type: e, attrs: t }).concat(s.map(Iu)) : null;
}
function Iu(n) {
  return { type: n, attrs: null };
}
function ey(n, e) {
  let { parent: t, startIndex: r, endIndex: o } = n, s = t.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let i = s.length ? s[0] : e;
  return t.canReplaceWith(r, o, i) ? s : null;
}
function ty(n, e) {
  let { parent: t, startIndex: r, endIndex: o } = n, s = t.child(r), i = e.contentMatch.findWrapping(s.type);
  if (!i)
    return null;
  let l = (i.length ? i[i.length - 1] : e).contentMatch;
  for (let c = r; l && c < o; c++)
    l = l.matchType(t.child(c).type);
  return !l || !l.validEnd ? null : i;
}
function ny(n, e, t) {
  let r = M.empty;
  for (let i = t.length - 1; i >= 0; i--) {
    if (r.size) {
      let a = t[i].type.contentMatch.matchFragment(r);
      if (!a || !a.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = M.from(t[i].type.create(t[i].attrs, r));
  }
  let o = e.start, s = e.end;
  n.step(new Oe(o, s, o, s, new R(r, 0, 0), t.length, !0));
}
function ry(n, e, t, r, o) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (i, a) => {
    if (i.isTextblock && !i.hasMarkup(r, o) && oy(n.doc, n.mapping.slice(s).map(a), r)) {
      n.clearIncompatible(n.mapping.slice(s).map(a, 1), r);
      let l = n.mapping.slice(s), c = l.map(a, 1), u = l.map(a + i.nodeSize, 1);
      return n.step(new Oe(c, u, c + 1, u - 1, new R(M.from(r.create(o, null, i.marks)), 0, 0), 1, !0)), !1;
    }
  });
}
function oy(n, e, t) {
  let r = n.resolve(e), o = r.index();
  return r.parent.canReplaceWith(o, o + 1, t);
}
function sy(n, e, t, r, o) {
  let s = n.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  t || (t = s.type);
  let i = t.create(r, null, o || s.marks);
  if (s.isLeaf)
    return n.replaceWith(e, e + s.nodeSize, i);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new Oe(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new R(M.from(i), 0, 0), 1, !0));
}
function Pr(n, e, t = 1, r) {
  let o = n.resolve(e), s = o.depth - t, i = r && r[r.length - 1] || o.parent;
  if (s < 0 || o.parent.type.spec.isolating || !o.parent.canReplace(o.index(), o.parent.childCount) || !i.type.validContent(o.parent.content.cutByIndex(o.index(), o.parent.childCount)))
    return !1;
  for (let c = o.depth - 1, u = t - 2; c > s; c--, u--) {
    let d = o.node(c), f = o.index(c);
    if (d.type.spec.isolating)
      return !1;
    let p = d.content.cutByIndex(f, d.childCount), h = r && r[u + 1];
    h && (p = p.replaceChild(0, h.type.create(h.attrs)));
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(p))
      return !1;
  }
  let a = o.indexAfter(s), l = r && r[0];
  return o.node(s).canReplaceWith(a, a, l ? l.type : o.node(s + 1).type);
}
function iy(n, e, t = 1, r) {
  let o = n.doc.resolve(e), s = M.empty, i = M.empty;
  for (let a = o.depth, l = o.depth - t, c = t - 1; a > l; a--, c--) {
    s = M.from(o.node(a).copy(s));
    let u = r && r[c];
    i = M.from(u ? u.type.create(u.attrs, i) : o.node(a).copy(i));
  }
  n.step(new Re(e, e, new R(s.append(i), t, t), !0));
}
function En(n, e) {
  let t = n.resolve(e), r = t.index();
  return eh(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function eh(n, e) {
  return !!(n && e && !n.isLeaf && n.canAppend(e));
}
function _i(n, e, t = -1) {
  let r = n.resolve(e);
  for (let o = r.depth; ; o--) {
    let s, i, a = r.index(o);
    if (o == r.depth ? (s = r.nodeBefore, i = r.nodeAfter) : t > 0 ? (s = r.node(o + 1), a++, i = r.node(o).maybeChild(a)) : (s = r.node(o).maybeChild(a - 1), i = r.node(o + 1)), s && !s.isTextblock && eh(s, i) && r.node(o).canReplace(a, a + 1))
      return e;
    if (o == 0)
      break;
    e = t < 0 ? r.before(o) : r.after(o);
  }
}
function ay(n, e, t) {
  let r = new Re(e - t, e + t, R.empty, !0);
  n.step(r);
}
function ly(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let o = r.depth - 1; o >= 0; o--) {
      let s = r.index(o);
      if (r.node(o).canReplaceWith(s, s, t))
        return r.before(o + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let o = r.depth - 1; o >= 0; o--) {
      let s = r.indexAfter(o);
      if (r.node(o).canReplaceWith(s, s, t))
        return r.after(o + 1);
      if (s < r.node(o).childCount)
        return null;
    }
  return null;
}
function th(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let o = t.content;
  for (let s = 0; s < t.openStart; s++)
    o = o.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
    for (let i = r.depth; i >= 0; i--) {
      let a = i == r.depth ? 0 : r.pos <= (r.start(i + 1) + r.end(i + 1)) / 2 ? -1 : 1, l = r.index(i) + (a > 0 ? 1 : 0), c = r.node(i), u = !1;
      if (s == 1)
        u = c.canReplace(l, l, o);
      else {
        let d = c.contentMatchAt(l).findWrapping(o.firstChild.type);
        u = d && c.canReplaceWith(l, l, d[0]);
      }
      if (u)
        return a == 0 ? r.pos : a < 0 ? r.before(i + 1) : r.after(i + 1);
    }
  return null;
}
function gc(n, e, t = e, r = R.empty) {
  if (e == t && !r.size)
    return null;
  let o = n.resolve(e), s = n.resolve(t);
  return nh(o, s, r) ? new Re(e, t, r) : new cy(o, s, r).fit();
}
function nh(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class cy {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = M.empty;
    for (let o = 0; o <= e.depth; o++) {
      let s = e.node(o);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(o))
      });
    }
    for (let o = e.depth; o > 0; o--)
      this.placed = M.from(e.node(o).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, o = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!o)
      return null;
    let s = this.placed, i = r.depth, a = o.depth;
    for (; i && a && s.childCount == 1; )
      s = s.firstChild.content, i--, a--;
    let l = new R(s, i, a);
    return e > -1 ? new Oe(r.pos, e, this.$to.pos, this.$to.end(), l, t) : l.size || r.pos != this.$to.pos ? new Re(r.pos, o.pos, l) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, o = this.unplaced.openEnd; r < e; r++) {
      let s = t.firstChild;
      if (t.childCount > 1 && (o = 0), s.type.spec.isolating && o <= r) {
        e = r;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let o, s = null;
        r ? (s = ma(this.unplaced.content, r - 1).firstChild, o = s.content) : o = this.unplaced.content;
        let i = o.firstChild;
        for (let a = this.depth; a >= 0; a--) {
          let { type: l, match: c } = this.frontier[a], u, d = null;
          if (t == 1 && (i ? c.matchType(i.type) || (d = c.fillBefore(M.from(i), !1)) : s && l.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: a, parent: s, inject: d };
          if (t == 2 && i && (u = c.findWrapping(i.type)))
            return { sliceDepth: r, frontierDepth: a, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, o = ma(e, t);
    return !o.childCount || o.firstChild.isLeaf ? !1 : (this.unplaced = new R(e, t + 1, Math.max(r, o.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, o = ma(e, t);
    if (o.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + o.size;
      this.unplaced = new R(mo(e, t - 1, 1), t - 1, s ? t - 1 : r);
    } else
      this.unplaced = new R(mo(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: o, wrap: s }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let i = this.unplaced, a = r ? r.content : i.content, l = i.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (o) {
      for (let m = 0; m < o.childCount; m++)
        u.push(o.child(m));
      d = d.matchFragment(o);
    }
    let p = a.size + e - (i.content.size - i.openEnd);
    for (; c < a.childCount; ) {
      let m = a.child(c), g = d.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || l == 0 || m.content.size) && (d = g, u.push(rh(m.mark(f.allowedMarks(m.marks)), c == 1 ? l : 0, c == a.childCount ? p : -1)));
    }
    let h = c == a.childCount;
    h || (p = -1), this.placed = go(this.placed, t, M.from(u)), this.frontier[t].match = d, h && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = a; m < p; m++) {
      let b = g.lastChild;
      this.frontier.push({ type: b.type, match: b.contentMatchAt(b.childCount) }), g = b.content;
    }
    this.unplaced = h ? e == 0 ? R.empty : new R(mo(i.content, e - 1, 1), e - 1, p < 0 ? i.openEnd : e - 1) : new R(mo(i.content, e, c), i.openStart, i.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !ga(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, o = this.$to.after(r);
    for (; r > 1 && o == this.$to.end(--r); )
      ++o;
    return o;
  }
  findCloseLevel(e) {
    e:
      for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
        let { match: r, type: o } = this.frontier[t], s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), i = ga(e, t, o, r, s);
        if (i) {
          for (let a = t - 1; a >= 0; a--) {
            let { match: l, type: c } = this.frontier[a], u = ga(e, a, c, l, !0);
            if (!u || u.childCount)
              continue e;
          }
          return { depth: t, fit: i, move: s ? e.doc.resolve(e.after(t + 1)) : e };
        }
      }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = go(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let o = e.node(r), s = o.type.contentMatch.fillBefore(o.content, !0, e.index(r));
      this.openFrontierNode(o.type, o.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let o = this.frontier[this.depth];
    o.match = o.match.matchType(e), this.placed = go(this.placed, this.depth, M.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(M.empty, !0);
    t.childCount && (this.placed = go(this.placed, this.frontier.length, t));
  }
}
function mo(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(mo(n.firstChild.content, e - 1, t)));
}
function go(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(go(n.lastChild.content, e - 1, t)));
}
function ma(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function rh(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, rh(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(M.empty, !0)))), n.copy(r);
}
function ga(n, e, t, r, o) {
  let s = n.node(e), i = o ? n.indexAfter(e) : n.index(e);
  if (i == s.childCount && !t.compatibleContent(s.type))
    return null;
  let a = r.fillBefore(s.content, !0, i);
  return a && !uy(t, s.content, i) ? a : null;
}
function uy(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function dy(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function fy(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let o = n.doc.resolve(e), s = n.doc.resolve(t);
  if (nh(o, s, r))
    return n.step(new Re(e, t, r));
  let i = sh(o, n.doc.resolve(t));
  i[i.length - 1] == 0 && i.pop();
  let a = -(o.depth + 1);
  i.unshift(a);
  for (let f = o.depth, p = o.pos - 1; f > 0; f--, p--) {
    let h = o.node(f).type.spec;
    if (h.defining || h.definingAsContext || h.isolating)
      break;
    i.indexOf(f) > -1 ? a = f : o.before(f) == p && i.splice(1, 0, -f);
  }
  let l = i.indexOf(a), c = [], u = r.openStart;
  for (let f = r.content, p = 0; ; p++) {
    let h = f.firstChild;
    if (c.push(h), p == r.openStart)
      break;
    f = h.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let p = c[f], h = dy(p.type);
    if (h && !p.sameMarkup(o.node(Math.abs(a) - 1)))
      u = f;
    else if (h || !p.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let p = (f + u + 1) % (r.openStart + 1), h = c[p];
    if (h)
      for (let m = 0; m < i.length; m++) {
        let g = i[(m + l) % i.length], b = !0;
        g < 0 && (b = !1, g = -g);
        let v = o.node(g - 1), x = o.index(g - 1);
        if (v.canReplaceWith(x, x, h.type, h.marks))
          return n.replace(o.before(g), b ? s.after(g) : t, new R(oh(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = i.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = i[f];
    p < 0 || (e = o.before(p), t = s.after(p));
  }
}
function oh(n, e, t, r, o) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(oh(s.content, e + 1, t, r, s)));
  }
  if (e > r) {
    let s = o.contentMatchAt(0), i = s.fillBefore(n).append(n);
    n = i.append(s.matchFragment(i).fillBefore(M.empty, !0));
  }
  return n;
}
function py(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let o = ly(n.doc, e, r.type);
    o != null && (e = t = o);
  }
  n.replaceRange(e, t, new R(M.from(r), 0, 0));
}
function hy(n, e, t) {
  let r = n.doc.resolve(e), o = n.doc.resolve(t), s = sh(r, o);
  for (let i = 0; i < s.length; i++) {
    let a = s[i], l = i == s.length - 1;
    if (l && a == 0 || r.node(a).type.contentMatch.validEnd)
      return n.delete(r.start(a), o.end(a));
    if (a > 0 && (l || r.node(a - 1).canReplace(r.index(a - 1), o.indexAfter(a - 1))))
      return n.delete(r.before(a), o.after(a));
  }
  for (let i = 1; i <= r.depth && i <= o.depth; i++)
    if (e - r.start(i) == r.depth - i && t > r.end(i) && o.end(i) - t != o.depth - i)
      return n.delete(r.before(i), t);
  n.delete(e, t);
}
function sh(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let o = r; o >= 0; o--) {
    let s = n.start(o);
    if (s < n.pos - (n.depth - o) || e.end(o) > e.pos + (e.depth - o) || n.node(o).type.spec.isolating || e.node(o).type.spec.isolating)
      break;
    (s == e.start(o) || o == n.depth && o == e.depth && n.parent.inlineContent && e.parent.inlineContent && o && e.start(o - 1) == s - 1) && t.push(o);
  }
  return t;
}
class Ir extends nt {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return we.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in t.attrs)
      r[s] = t.attrs[s];
    r[this.attr] = this.value;
    let o = t.type.create(r, null, t.marks);
    return we.fromReplace(e, this.pos, this.pos + 1, new R(M.from(o), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return dt.empty;
  }
  invert(e) {
    return new Ir(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ir(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Ir(t.pos, t.attr, t.value);
  }
}
nt.jsonID("attr", Ir);
let $r = class extends Error {
};
$r = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
$r.prototype = Object.create(Error.prototype);
$r.prototype.constructor = $r;
$r.prototype.name = "TransformError";
class ih {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Lr();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new $r(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = R.empty) {
    let o = gc(this.doc, e, t, r);
    return o && this.step(o), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new R(M.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, R.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return fy(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return py(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return hy(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Q0(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return ay(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return ny(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, o = null) {
    return ry(this, e, t, r, o), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, o) {
    return sy(this, e, t, r, o), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Ir(e, t, r)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new bn(e, t)), this;
  }
  /**
  Remove a mark (or a mark of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    if (!(t instanceof oe)) {
      let r = this.doc.nodeAt(e);
      if (!r)
        throw new RangeError("No node at position " + e);
      if (t = t.isInSet(r.marks), !t)
        return this;
    }
    return this.step(new zr(e, t)), this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split.
  */
  split(e, t = 1, r) {
    return iy(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return G0(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Z0(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Y0(this, e, t, r), this;
  }
}
const ya = /* @__PURE__ */ Object.create(null);
class X {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new my(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = R.empty) {
    let r = t.content.lastChild, o = null;
    for (let a = 0; a < t.openEnd; a++)
      o = r, r = r.lastChild;
    let s = e.steps.length, i = this.ranges;
    for (let a = 0; a < i.length; a++) {
      let { $from: l, $to: c } = i[a], u = e.mapping.slice(s);
      e.replaceRange(u.map(l.pos), u.map(c.pos), a ? R.empty : t), a == 0 && qu(e, s, (r ? r.isInline : o && o.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, o = this.ranges;
    for (let s = 0; s < o.length; s++) {
      let { $from: i, $to: a } = o[s], l = e.mapping.slice(r), c = l.map(i.pos), u = l.map(a.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), qu(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let o = e.parent.inlineContent ? new G(e) : wr(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (o)
      return o;
    for (let s = e.depth - 1; s >= 0; s--) {
      let i = t < 0 ? wr(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, r) : wr(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, r);
      if (i)
        return i;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new St(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return wr(e, e, 0, 0, 1) || new St(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return wr(e, e, e.content.size, e.childCount, -1) || new St(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = ya[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in ya)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return ya[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return G.between(this.$anchor, this.$head).getBookmark();
  }
}
X.prototype.visible = !0;
class my {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Bu = !1;
function Fu(n) {
  !Bu && !n.parent.inlineContent && (Bu = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class G extends X {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Fu(e), Fu(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return X.near(r);
    let o = e.resolve(t.map(this.anchor));
    return new G(o.parent.inlineContent ? o : r, r);
  }
  replace(e, t = R.empty) {
    if (super.replace(e, t), t == R.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof G && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Ni(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new G(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let o = e.resolve(t);
    return new this(o, r == t ? o : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let o = e.pos - t.pos;
    if ((!r || o) && (r = o >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let s = X.findFrom(t, r, !0) || X.findFrom(t, -r, !0);
      if (s)
        t = s.$head;
      else
        return X.near(t, r);
    }
    return e.parent.inlineContent || (o == 0 ? e = t : (e = (X.findFrom(e, -r, !0) || X.findFrom(e, r, !0)).$anchor, e.pos < t.pos != o < 0 && (e = t))), new G(e, t);
  }
}
X.jsonID("text", G);
class Ni {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Ni(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return G.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class j extends X {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: o } = t.mapResult(this.anchor), s = e.resolve(o);
    return r ? X.near(s) : new j(s);
  }
  content() {
    return new R(M.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof j && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new yc(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new j(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new j(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
j.prototype.visible = !1;
X.jsonID("node", j);
class yc {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Ni(r, r) : new yc(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && j.isSelectable(r) ? new j(t) : X.near(t);
  }
}
class St extends X {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = R.empty) {
    if (t == R.empty) {
      e.delete(0, e.doc.content.size);
      let r = X.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new St(e);
  }
  map(e) {
    return new St(e);
  }
  eq(e) {
    return e instanceof St;
  }
  getBookmark() {
    return gy;
  }
}
X.jsonID("all", St);
const gy = {
  map() {
    return this;
  },
  resolve(n) {
    return new St(n);
  }
};
function wr(n, e, t, r, o, s = !1) {
  if (e.inlineContent)
    return G.create(n, t);
  for (let i = r - (o > 0 ? 0 : 1); o > 0 ? i < e.childCount : i >= 0; i += o) {
    let a = e.child(i);
    if (a.isAtom) {
      if (!s && j.isSelectable(a))
        return j.create(n, t - (o < 0 ? a.nodeSize : 0));
    } else {
      let l = wr(n, a, t + o, o < 0 ? a.childCount : 0, o, s);
      if (l)
        return l;
    }
    t += a.nodeSize * o;
  }
  return null;
}
function qu(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let o = n.steps[r];
  if (!(o instanceof Re || o instanceof Oe))
    return;
  let s = n.mapping.maps[r], i;
  s.forEach((a, l, c, u) => {
    i == null && (i = u);
  }), n.setSelection(X.near(n.doc.resolve(i), t));
}
const zu = 1, gs = 2, $u = 4;
class yy extends ih {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | zu) & ~gs, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & zu) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= gs, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return oe.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & gs) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~gs, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || oe.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, r) {
    let o = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(o.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r ?? t, !e)
        return this.deleteRange(t, r);
      let s = this.storedMarks;
      if (!s) {
        let i = this.doc.resolve(t);
        s = r == t ? i.marks() : i.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, o.text(e, s)), this.selection.empty || this.setSelection(X.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= $u, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & $u) > 0;
  }
}
function Hu(n, e) {
  return !e || !n ? n : n.bind(e);
}
class yo {
  constructor(e, t, r) {
    this.name = e, this.init = Hu(t.init, r), this.apply = Hu(t.apply, r);
  }
}
const by = [
  new yo("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new yo("selection", {
    init(n, e) {
      return n.selection || X.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new yo("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new yo("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class ba {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = by.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new yo(r.key, r.spec.state, r));
    });
  }
}
class Or {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let o = this.config.plugins[r];
        if (o.spec.filterTransaction && !o.spec.filterTransaction.call(o, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), o = null;
    for (; ; ) {
      let s = !1;
      for (let i = 0; i < this.config.plugins.length; i++) {
        let a = this.config.plugins[i];
        if (a.spec.appendTransaction) {
          let l = o ? o[i].n : 0, c = o ? o[i].state : this, u = l < t.length && a.spec.appendTransaction.call(a, l ? t.slice(l) : t, c, r);
          if (u && r.filterTransaction(u, i)) {
            if (u.setMeta("appendedTransaction", e), !o) {
              o = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                o.push(d < i ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), r = r.applyInner(u), s = !0;
          }
          o && (o[i] = { state: r, n: t.length });
        }
      }
      if (!s)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new Or(this.config), r = this.config.fields;
    for (let o = 0; o < r.length; o++) {
      let s = r[o];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new yy(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new ba(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new Or(t);
    for (let o = 0; o < t.fields.length; o++)
      r[t.fields[o].name] = t.fields[o].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new ba(this.schema, e.plugins), r = t.fields, o = new Or(t);
    for (let s = 0; s < r.length; s++) {
      let i = r[s].name;
      o[i] = this.hasOwnProperty(i) ? this[i] : r[s].init(e, o);
    }
    return o;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let o = e[r], s = o.spec.state;
        s && s.toJSON && (t[r] = s.toJSON.call(o, this[o.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let o = new ba(e.schema, e.plugins), s = new Or(o);
    return o.fields.forEach((i) => {
      if (i.name == "doc")
        s.doc = Jn.fromJSON(e.schema, t.doc);
      else if (i.name == "selection")
        s.selection = X.fromJSON(s.doc, t.selection);
      else if (i.name == "storedMarks")
        t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let a in r) {
            let l = r[a], c = l.spec.state;
            if (l.key == i.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, a)) {
              s[i.name] = c.fromJSON.call(l, e, t[a], s);
              return;
            }
          }
        s[i.name] = i.init(e, s);
      }
    }), s;
  }
}
function ah(n, e, t) {
  for (let r in n) {
    let o = n[r];
    o instanceof Function ? o = o.bind(e) : r == "handleDOMEvents" && (o = ah(o, e, {})), t[r] = o;
  }
  return t;
}
class be {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && ah(e.props, this, this.props), this.key = e.key ? e.key.key : lh("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const va = /* @__PURE__ */ Object.create(null);
function lh(n) {
  return n in va ? n + "$" + ++va[n] : (va[n] = 0, n + "$");
}
class Pe {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = lh(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const ze = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, No = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let ju = null;
const Jt = function(n, e, t) {
  let r = ju || (ju = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, or = function(n, e, t, r) {
  return t && (Vu(n, e, t, r, -1) || Vu(n, e, t, r, 1));
}, vy = /^(img|br|input|textarea|hr)$/i;
function Vu(n, e, t, r, o) {
  for (; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (o < 0 ? 0 : Lt(n))) {
      let s = n.parentNode;
      if (!s || s.nodeType != 1 || bc(n) || vy.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = ze(n) + (o < 0 ? 0 : 1), n = s;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (o < 0 ? -1 : 0)], n.contentEditable == "false")
        return !1;
      e = o < 0 ? Lt(n) : 0;
    } else
      return !1;
  }
}
function Lt(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function ky(n, e, t) {
  for (let r = e == 0, o = e == Lt(n); r || o; ) {
    if (n == t)
      return !0;
    let s = ze(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && s == 0, o = o && s == Lt(n);
  }
}
function bc(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const Ri = function(n) {
  return n.focusNode && or(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function Pn(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function xy(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function wy(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: r.offset };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: r.startOffset };
  }
}
const zt = typeof navigator < "u" ? navigator : null, Uu = typeof document < "u" ? document : null, An = zt && zt.userAgent || "", yl = /Edge\/(\d+)/.exec(An), ch = /MSIE \d/.exec(An), bl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(An), Xe = !!(ch || bl || yl), kn = ch ? document.documentMode : bl ? +bl[1] : yl ? +yl[1] : 0, At = !Xe && /gecko\/(\d+)/i.test(An);
At && +(/Firefox\/(\d+)/.exec(An) || [0, 0])[1];
const vl = !Xe && /Chrome\/(\d+)/.exec(An), Be = !!vl, Sy = vl ? +vl[1] : 0, Ve = !Xe && !!zt && /Apple Computer/.test(zt.vendor), Hr = Ve && (/Mobile\/\w+/.test(An) || !!zt && zt.maxTouchPoints > 2), ut = Hr || (zt ? /Mac/.test(zt.platform) : !1), Cy = zt ? /Win/.test(zt.platform) : !1, kt = /Android \d/.test(An), Li = !!Uu && "webkitFontSmoothing" in Uu.documentElement.style, Ey = Li ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Ay(n) {
  return {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function Wt(n, e) {
  return typeof n == "number" ? n : n[e];
}
function Ty(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function Wu(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, o = n.someProp("scrollMargin") || 5, s = n.dom.ownerDocument;
  for (let i = t || n.dom; i; i = No(i)) {
    if (i.nodeType != 1)
      continue;
    let a = i, l = a == s.body, c = l ? Ay(s) : Ty(a), u = 0, d = 0;
    if (e.top < c.top + Wt(r, "top") ? d = -(c.top - e.top + Wt(o, "top")) : e.bottom > c.bottom - Wt(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + Wt(o, "top") - c.top : e.bottom - c.bottom + Wt(o, "bottom")), e.left < c.left + Wt(r, "left") ? u = -(c.left - e.left + Wt(o, "left")) : e.right > c.right - Wt(r, "right") && (u = e.right - c.right + Wt(o, "right")), u || d)
      if (l)
        s.defaultView.scrollBy(u, d);
      else {
        let f = a.scrollLeft, p = a.scrollTop;
        d && (a.scrollTop += d), u && (a.scrollLeft += u);
        let h = a.scrollLeft - f, m = a.scrollTop - p;
        e = { left: e.left - h, top: e.top - m, right: e.right - h, bottom: e.bottom - m };
      }
    if (l || /^(fixed|sticky)$/.test(getComputedStyle(i).position))
      break;
  }
}
function Oy(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, o;
  for (let s = (e.left + e.right) / 2, i = t + 1; i < Math.min(innerHeight, e.bottom); i += 5) {
    let a = n.root.elementFromPoint(s, i);
    if (!a || a == n.dom || !n.dom.contains(a))
      continue;
    let l = a.getBoundingClientRect();
    if (l.top >= t - 20) {
      r = a, o = l.top;
      break;
    }
  }
  return { refDOM: r, refTop: o, stack: uh(n.dom) };
}
function uh(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = No(r))
    ;
  return e;
}
function My({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  dh(t, r == 0 ? 0 : r - e);
}
function dh(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: o, left: s } = n[t];
    r.scrollTop != o + e && (r.scrollTop = o + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let br = null;
function Dy(n) {
  if (n.setActive)
    return n.setActive();
  if (br)
    return n.focus(br);
  let e = uh(n);
  n.focus(br == null ? {
    get preventScroll() {
      return br = { preventScroll: !0 }, !0;
    }
  } : void 0), br || (br = !1, dh(e, 0));
}
function fh(n, e) {
  let t, r = 2e8, o, s = 0, i = e.top, a = e.top, l, c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = Jt(u).getClientRects();
    else
      continue;
    for (let p = 0; p < f.length; p++) {
      let h = f[p];
      if (h.top <= i && h.bottom >= a) {
        i = Math.max(h.bottom, i), a = Math.min(h.top, a);
        let m = h.left > e.left ? h.left - e.left : h.right < e.left ? e.left - h.right : 0;
        if (m < r) {
          t = u, r = m, o = m && t.nodeType == 3 ? {
            left: h.right < e.left ? h.right : h.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (s = d + (e.left >= (h.left + h.right) / 2 ? 1 : 0));
          continue;
        }
      } else
        h.top > e.top && !l && h.left <= e.left && h.right >= e.left && (l = u, c = { left: Math.max(h.left, Math.min(h.right, e.left)), top: h.top });
      !t && (e.left >= h.right && e.top >= h.top || e.left >= h.left && e.top >= h.bottom) && (s = d + 1);
    }
  }
  return !t && l && (t = l, o = c, r = 0), t && t.nodeType == 3 ? _y(t, o) : !t || r && t.nodeType == 1 ? { node: n, offset: s } : fh(t, o);
}
function _y(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let o = 0; o < t; o++) {
    r.setEnd(n, o + 1), r.setStart(n, o);
    let s = un(r, 1);
    if (s.top != s.bottom && vc(e, s))
      return { node: n, offset: o + (e.left >= (s.left + s.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function vc(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function Ny(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function Ry(n, e, t) {
  let { node: r, offset: o } = fh(e, t), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let i = r.getBoundingClientRect();
    s = i.left != i.right && t.left > (i.left + i.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, o, s);
}
function Ly(n, e, t, r) {
  let o = -1;
  for (let s = e, i = !1; s != n.dom; ) {
    let a = n.docView.nearestDesc(s, !0);
    if (!a)
      return null;
    if (a.dom.nodeType == 1 && (a.node.isBlock && a.parent && !i || !a.contentDOM)) {
      let l = a.dom.getBoundingClientRect();
      if (a.node.isBlock && a.parent && !i && (i = !0, l.left > r.left || l.top > r.top ? o = a.posBefore : (l.right < r.left || l.bottom < r.top) && (o = a.posAfter)), !a.contentDOM && o < 0 && !a.node.isText)
        return (a.node.isBlock ? r.top < (l.top + l.bottom) / 2 : r.left < (l.left + l.right) / 2) ? a.posBefore : a.posAfter;
    }
    s = a.dom.parentNode;
  }
  return o > -1 ? o : n.docView.posFromDOM(e, t, -1);
}
function ph(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let o = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = o; ; ) {
      let i = n.childNodes[s];
      if (i.nodeType == 1) {
        let a = i.getClientRects();
        for (let l = 0; l < a.length; l++) {
          let c = a[l];
          if (vc(e, c))
            return ph(i, e, c);
        }
      }
      if ((s = (s + 1) % r) == o)
        break;
    }
  return n;
}
function Py(n, e) {
  let t = n.dom.ownerDocument, r, o = 0, s = wy(t, e.left, e.top);
  s && ({ node: r, offset: o } = s);
  let i = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), a;
  if (!i || !n.dom.contains(i.nodeType != 1 ? i.parentNode : i)) {
    let c = n.dom.getBoundingClientRect();
    if (!vc(e, c) || (i = ph(n.dom, e, c), !i))
      return null;
  }
  if (Ve)
    for (let c = i; r && c; c = No(c))
      c.draggable && (r = void 0);
  if (i = Ny(i, e), r) {
    if (At && r.nodeType == 1 && (o = Math.min(o, r.childNodes.length), o < r.childNodes.length)) {
      let c = r.childNodes[o], u;
      c.nodeName == "IMG" && (u = c.getBoundingClientRect()).right <= e.left && u.bottom > e.top && o++;
    }
    r == n.dom && o == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? a = n.state.doc.content.size : (o == 0 || r.nodeType != 1 || r.childNodes[o - 1].nodeName != "BR") && (a = Ly(n, r, o, e));
  }
  a == null && (a = Ry(n, i, e));
  let l = n.docView.nearestDesc(i, !0);
  return { pos: a, inside: l ? l.posAtStart - l.border : -1 };
}
function Ku(n) {
  return n.top < n.bottom || n.left < n.right;
}
function un(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (Ku(r))
      return r;
  }
  return Array.prototype.find.call(t, Ku) || n.getBoundingClientRect();
}
const Iy = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function hh(n, e, t) {
  let { node: r, offset: o, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1), i = Li || At;
  if (r.nodeType == 3)
    if (i && (Iy.test(r.nodeValue) || (t < 0 ? !o : o == r.nodeValue.length))) {
      let l = un(Jt(r, o, o), t);
      if (At && o && /\s/.test(r.nodeValue[o - 1]) && o < r.nodeValue.length) {
        let c = un(Jt(r, o - 1, o - 1), -1);
        if (c.top == l.top) {
          let u = un(Jt(r, o, o + 1), -1);
          if (u.top != l.top)
            return co(u, u.left < c.left);
        }
      }
      return l;
    } else {
      let l = o, c = o, u = t < 0 ? 1 : -1;
      return t < 0 && !o ? (c++, u = -1) : t >= 0 && o == r.nodeValue.length ? (l--, u = 1) : t < 0 ? l-- : c++, co(un(Jt(r, l, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && o && (t < 0 || o == Lt(r))) {
      let l = r.childNodes[o - 1];
      if (l.nodeType == 1)
        return ka(l.getBoundingClientRect(), !1);
    }
    if (s == null && o < Lt(r)) {
      let l = r.childNodes[o];
      if (l.nodeType == 1)
        return ka(l.getBoundingClientRect(), !0);
    }
    return ka(r.getBoundingClientRect(), t >= 0);
  }
  if (s == null && o && (t < 0 || o == Lt(r))) {
    let l = r.childNodes[o - 1], c = l.nodeType == 3 ? Jt(l, Lt(l) - (i ? 0 : 1)) : l.nodeType == 1 && (l.nodeName != "BR" || !l.nextSibling) ? l : null;
    if (c)
      return co(un(c, 1), !1);
  }
  if (s == null && o < Lt(r)) {
    let l = r.childNodes[o];
    for (; l.pmViewDesc && l.pmViewDesc.ignoreForCoords; )
      l = l.nextSibling;
    let c = l ? l.nodeType == 3 ? Jt(l, 0, i ? 0 : 1) : l.nodeType == 1 ? l : null : null;
    if (c)
      return co(un(c, -1), !0);
  }
  return co(un(r.nodeType == 3 ? Jt(r) : r, -t), t >= 0);
}
function co(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function ka(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function mh(n, e, t) {
  let r = n.state, o = n.root.activeElement;
  r != e && n.updateState(e), o != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), o != n.dom && o && o.focus();
  }
}
function By(n, e, t) {
  let r = e.selection, o = t == "up" ? r.$from : r.$to;
  return mh(n, e, () => {
    let { node: s } = n.docView.domFromPos(o.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let a = n.docView.nearestDesc(s, !0);
      if (!a)
        break;
      if (a.node.isBlock) {
        s = a.contentDOM || a.dom;
        break;
      }
      s = a.dom.parentNode;
    }
    let i = hh(n, o.pos, 1);
    for (let a = s.firstChild; a; a = a.nextSibling) {
      let l;
      if (a.nodeType == 1)
        l = a.getClientRects();
      else if (a.nodeType == 3)
        l = Jt(a, 0, a.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < l.length; c++) {
        let u = l[c];
        if (u.bottom > u.top + 1 && (t == "up" ? i.top - u.top > (u.bottom - i.top) * 2 : u.bottom - i.bottom > (i.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Fy = /[\u0590-\u08ac]/;
function qy(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let o = r.parentOffset, s = !o, i = o == r.parent.content.size, a = n.domSelection();
  return !Fy.test(r.parent.textContent) || !a.modify ? t == "left" || t == "backward" ? s : i : mh(n, e, () => {
    let { focusNode: l, focusOffset: c, anchorNode: u, anchorOffset: d } = n.domSelectionRange(), f = a.caretBidiLevel;
    a.modify("move", t, "character");
    let p = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: h, focusOffset: m } = n.domSelectionRange(), g = h && !p.contains(h.nodeType == 1 ? h : h.parentNode) || l == h && c == m;
    try {
      a.collapse(u, d), l && (l != u || c != d) && a.extend && a.extend(l, c);
    } catch {
    }
    return f != null && (a.caretBidiLevel = f), g;
  });
}
let Ju = null, Gu = null, Zu = !1;
function zy(n, e, t) {
  return Ju == e && Gu == t ? Zu : (Ju = e, Gu = t, Zu = t == "up" || t == "down" ? By(n, e, t) : qy(n, e, t));
}
const pt = 0, Yu = 1, qn = 2, $t = 3;
class Ko {
  constructor(e, t, r, o) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = o, this.dirty = pt, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let o = this.children[t];
      if (o == e)
        return r;
      r += o.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, i;
        if (e == this.contentDOM)
          s = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((i = s.pmViewDesc) && i.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(i) + i.size : this.posAtStart;
      } else {
        let s, i;
        if (e == this.contentDOM)
          s = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((i = s.pmViewDesc) && i.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(i) : this.posAtEnd;
      }
    let o;
    if (e == this.dom && this.contentDOM)
      o = t > ze(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      o = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            o = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (o == null && t == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            o = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return o ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, o = e; o; o = o.parentNode) {
      let s = this.getDesc(o), i;
      if (s && (!t || s.node))
        if (r && (i = s.nodeDOM) && !(i.nodeType == 1 ? i.contains(e.nodeType == 1 ? e : e.parentNode) : i == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let o = e; o; o = o.parentNode) {
      let s = this.getDesc(o);
      if (s)
        return s.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let o = this.children[t], s = r + o.size;
      if (r == e && s != r) {
        for (; !o.border && o.children.length; )
          o = o.children[0];
        return o;
      }
      if (e < s)
        return o.descAt(e - r - o.border);
      r = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, o = 0;
    for (let s = 0; r < this.children.length; r++) {
      let i = this.children[r], a = s + i.size;
      if (a > e || i instanceof yh) {
        o = e - s;
        break;
      }
      s = a;
    }
    if (o)
      return this.children[r].domFromPos(o - this.children[r].border, t);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof gh && s.side >= 0; r--)
      ;
    if (t <= 0) {
      let s, i = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, i = !1)
        ;
      return s && t && i && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : { node: this.contentDOM, offset: s ? ze(s.dom) + 1 : 0 };
    } else {
      let s, i = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, i = !1)
        ;
      return s && i && !s.border && !s.domAtom ? s.domFromPos(0, t) : { node: this.contentDOM, offset: s ? ze(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let o = -1, s = -1;
    for (let i = r, a = 0; ; a++) {
      let l = this.children[a], c = i + l.size;
      if (o == -1 && e <= c) {
        let u = i + l.border;
        if (e >= u && t <= c - l.border && l.node && l.contentDOM && this.contentDOM.contains(l.contentDOM))
          return l.parseRange(e, t, u);
        e = i;
        for (let d = a; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            o = ze(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        o == -1 && (o = 0);
      }
      if (o > -1 && (c > t || a == this.children.length - 1)) {
        t = c;
        for (let u = a + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            s = ze(d.dom);
            break;
          }
          t += d.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      i = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: o, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, o = !1) {
    let s = Math.min(e, t), i = Math.max(e, t);
    for (let f = 0, p = 0; f < this.children.length; f++) {
      let h = this.children[f], m = p + h.size;
      if (s > p && i < m)
        return h.setSelection(e - p - h.border, t - p - h.border, r, o);
      p = m;
    }
    let a = this.domFromPos(e, e ? -1 : 1), l = t == e ? a : this.domFromPos(t, t ? -1 : 1), c = r.getSelection(), u = !1;
    if ((At || Ve) && e == t) {
      let { node: f, offset: p } = a;
      if (f.nodeType == 3) {
        if (u = !!(p && f.nodeValue[p - 1] == `
`), u && p == f.nodeValue.length)
          for (let h = f, m; h; h = h.parentNode) {
            if (m = h.nextSibling) {
              m.nodeName == "BR" && (a = l = { node: m.parentNode, offset: ze(m) + 1 });
              break;
            }
            let g = h.pmViewDesc;
            if (g && g.node && g.node.isBlock)
              break;
          }
      } else {
        let h = f.childNodes[p - 1];
        u = h && (h.nodeName == "BR" || h.contentEditable == "false");
      }
    }
    if (At && c.focusNode && c.focusNode != l.node && c.focusNode.nodeType == 1) {
      let f = c.focusNode.childNodes[c.focusOffset];
      f && f.contentEditable == "false" && (o = !0);
    }
    if (!(o || u && Ve) && or(a.node, a.offset, c.anchorNode, c.anchorOffset) && or(l.node, l.offset, c.focusNode, c.focusOffset))
      return;
    let d = !1;
    if ((c.extend || e == t) && !u) {
      c.collapse(a.node, a.offset);
      try {
        e != t && c.extend(l.node, l.offset), d = !0;
      } catch {
      }
    }
    if (!d) {
      if (e > t) {
        let p = a;
        a = l, l = p;
      }
      let f = document.createRange();
      f.setEnd(l.node, l.offset), f.setStart(a.node, a.offset), c.removeAllRanges(), c.addRange(f);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let r = 0, o = 0; o < this.children.length; o++) {
      let s = this.children[o], i = r + s.size;
      if (r == i ? e <= i && t >= r : e < i && t > r) {
        let a = r + s.border, l = i - s.border;
        if (e >= a && t <= l) {
          this.dirty = e == r || t == i ? qn : Yu, e == a && t == l && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = $t : s.markDirty(e - a, t - a);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? qn : $t;
      }
      r = i;
    }
    this.dirty = qn;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? qn : Yu;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
}
class gh extends Ko {
  constructor(e, t, r, o) {
    let s, i = t.type.toDOM;
    if (typeof i == "function" && (i = i(r, () => {
      if (!s)
        return o;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !t.type.spec.raw) {
      if (i.nodeType != 1) {
        let a = document.createElement("span");
        a.appendChild(i), i = a;
      }
      i.contentEditable = "false", i.classList.add("ProseMirror-widget");
    }
    super(e, [], i, null), this.widget = t, this.widget = t, s = this;
  }
  matchesWidget(e) {
    return this.dirty == pt && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class $y extends Ko {
  constructor(e, t, r, o) {
    super(e, [], t, null), this.textDOM = r, this.text = o;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class sr extends Ko {
  constructor(e, t, r, o) {
    super(e, [], r, o), this.mark = t;
  }
  static create(e, t, r, o) {
    let s = o.nodeViews[t.type.name], i = s && s(t, o, r);
    return (!i || !i.dom) && (i = Pt.renderSpec(document, t.type.spec.toDOM(t, r))), new sr(e, t, i.dom, i.contentDOM || i.dom);
  }
  parseRule() {
    return this.dirty & $t || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != $t && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != pt) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = pt;
    }
  }
  slice(e, t, r) {
    let o = sr.create(this.parent, this.mark, !0, r), s = this.children, i = this.size;
    t < i && (s = wl(s, t, i, r)), e > 0 && (s = wl(s, 0, e, r));
    for (let a = 0; a < s.length; a++)
      s[a].parent = o;
    return o.children = s, o;
  }
}
class xn extends Ko {
  constructor(e, t, r, o, s, i, a, l, c) {
    super(e, [], s, i), this.node = t, this.outerDeco = r, this.innerDeco = o, this.nodeDOM = a;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, r, o, s, i) {
    let a = s.nodeViews[t.type.name], l, c = a && a(t, s, () => {
      if (!l)
        return i;
      if (l.parent)
        return l.parent.posBeforeChild(l);
    }, r, o), u = c && c.dom, d = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else
      u || ({ dom: u, contentDOM: d } = Pt.renderSpec(document, t.type.spec.toDOM(t)));
    !d && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = kh(u, r, t), c ? l = new Hy(e, t, r, o, u, d || null, f, c, s, i + 1) : t.isText ? new Pi(e, t, r, o, u, f, s) : new xn(e, t, r, o, u, d || null, f, s, i + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => M.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == pt && e.eq(this.node) && xl(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let r = this.node.inlineContent, o = t, s = e.composing ? this.localCompositionInfo(e, t) : null, i = s && s.pos > -1 ? s : null, a = s && s.pos < 0, l = new Vy(this, i && i.node, e);
    Ky(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? l.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !d && l.syncToMarks(u == this.node.childCount ? oe.none : this.node.child(u).marks, r, e), l.placeWidget(c, e, o);
    }, (c, u, d, f) => {
      l.syncToMarks(c.marks, r, e);
      let p;
      l.findNodeMatch(c, u, d, f) || a && e.state.selection.from > o && e.state.selection.to < o + c.nodeSize && (p = l.findIndexWithChild(s.node)) > -1 && l.updateNodeAt(c, u, d, p, e) || l.updateNextNode(c, u, d, e, f, o) || l.addNode(c, u, d, e, o), o += c.nodeSize;
    }), l.syncToMarks([], r, e), this.node.isTextblock && l.addTextblockHacks(), l.destroyRest(), (l.changed || this.dirty == qn) && (i && this.protectLocalComposition(e, i), bh(this.contentDOM, this.children, e), Hr && Jy(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: o } = e.state.selection;
    if (!(e.state.selection instanceof G) || r < t || o > t + this.node.content.size)
      return null;
    let s = e.domSelectionRange(), i = Gy(s.focusNode, s.focusOffset);
    if (!i || !this.dom.contains(i.parentNode))
      return null;
    if (this.node.inlineContent) {
      let a = i.nodeValue, l = Zy(this.node.content, a, r - t, o - t);
      return l < 0 ? null : { node: i, pos: l, text: a };
    } else
      return { node: i, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: o }) {
    if (this.getDesc(t))
      return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let i = new $y(this, s, t, o);
    e.input.compositionNodes.push(i), this.children = wl(this.children, r, r + o.length, e, i);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, o) {
    return this.dirty == $t || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, o), !0);
  }
  updateInner(e, t, r, o) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(o, this.posAtStart), this.dirty = pt;
  }
  updateOuterDeco(e) {
    if (xl(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = vh(this.dom, this.nodeDOM, kl(this.outerDeco, this.node, t), kl(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable");
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Xu(n, e, t, r, o) {
  kh(r, e, n);
  let s = new xn(void 0, n, e, t, r, r, r, o, 0);
  return s.contentDOM && s.updateChildren(o, 0), s;
}
class Pi extends xn {
  constructor(e, t, r, o, s, i, a) {
    super(e, t, r, o, s, null, i, a, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, o) {
    return this.dirty == $t || this.dirty != pt && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != pt || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, o.trackWrites == this.nodeDOM && (o.trackWrites = null)), this.node = e, this.dirty = pt, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let o = this.node.cut(e, t), s = document.createTextNode(o.text);
    return new Pi(this.parent, o, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = $t);
  }
  get domAtom() {
    return !1;
  }
}
class yh extends Ko {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == pt && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class Hy extends xn {
  constructor(e, t, r, o, s, i, a, l, c, u) {
    super(e, t, r, o, s, i, a, c, u), this.spec = l;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, o) {
    if (this.dirty == $t)
      return !1;
    if (this.spec.update) {
      let s = this.spec.update(e, t, r);
      return s && this.updateInner(e, t, r, o), s;
    } else
      return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, o);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, o) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r) : super.setSelection(e, t, r, o);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function bh(n, e, t) {
  let r = n.firstChild, o = !1;
  for (let s = 0; s < e.length; s++) {
    let i = e[s], a = i.dom;
    if (a.parentNode == n) {
      for (; a != r; )
        r = Qu(r), o = !0;
      r = r.nextSibling;
    } else
      o = !0, n.insertBefore(a, r);
    if (i instanceof sr) {
      let l = r ? r.previousSibling : n.lastChild;
      bh(i.contentDOM, i.children, t), r = l ? l.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = Qu(r), o = !0;
  o && t.trackWrites == n && (t.trackWrites = null);
}
const ko = function(n) {
  n && (this.nodeName = n);
};
ko.prototype = /* @__PURE__ */ Object.create(null);
const zn = [new ko()];
function kl(n, e, t) {
  if (n.length == 0)
    return zn;
  let r = t ? zn[0] : new ko(), o = [r];
  for (let s = 0; s < n.length; s++) {
    let i = n[s].type.attrs;
    if (i) {
      i.nodeName && o.push(r = new ko(i.nodeName));
      for (let a in i) {
        let l = i[a];
        l != null && (t && o.length == 1 && o.push(r = new ko(e.isInline ? "span" : "div")), a == "class" ? r.class = (r.class ? r.class + " " : "") + l : a == "style" ? r.style = (r.style ? r.style + ";" : "") + l : a != "nodeName" && (r[a] = l));
      }
    }
  }
  return o;
}
function vh(n, e, t, r) {
  if (t == zn && r == zn)
    return e;
  let o = e;
  for (let s = 0; s < r.length; s++) {
    let i = r[s], a = t[s];
    if (s) {
      let l;
      a && a.nodeName == i.nodeName && o != n && (l = o.parentNode) && l.nodeName.toLowerCase() == i.nodeName || (l = document.createElement(i.nodeName), l.pmIsDeco = !0, l.appendChild(o), a = zn[0]), o = l;
    }
    jy(o, a || zn[0], i);
  }
  return o;
}
function jy(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], o = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      o.indexOf(r[s]) == -1 && n.classList.remove(r[s]);
    for (let s = 0; s < o.length; s++)
      r.indexOf(o[s]) == -1 && n.classList.add(o[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, o;
      for (; o = r.exec(e.style); )
        n.style.removeProperty(o[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function kh(n, e, t) {
  return vh(n, n, zn, kl(e, t, n.nodeType != 1));
}
function xl(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Qu(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class Vy {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Uy(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let o = 0, s = this.stack.length >> 1, i = Math.min(s, e.length);
    for (; o < i && (o == s - 1 ? this.top : this.stack[o + 1 << 1]).matchesMark(e[o]) && e[o].type.spec.spanning !== !1; )
      o++;
    for (; o < s; )
      this.destroyRest(), this.top.dirty = pt, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let a = -1;
      for (let l = this.index; l < Math.min(this.index + 3, this.top.children.length); l++) {
        let c = this.top.children[l];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          a = l;
          break;
        }
      }
      if (a > -1)
        a > this.index && (this.changed = !0, this.destroyBetween(this.index, a)), this.top = this.top.children[this.index];
      else {
        let l = sr.create(this.top, e[s], t, r);
        this.top.children.splice(this.index, 0, l), this.top = l, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, o) {
    let s = -1, i;
    if (o >= this.preMatch.index && (i = this.preMatch.matches[o - this.preMatch.index]).parent == this.top && i.matchesNode(e, t, r))
      s = this.top.children.indexOf(i, this.index);
    else
      for (let a = this.index, l = Math.min(this.top.children.length, a + 5); a < l; a++) {
        let c = this.top.children[a];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          s = a;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, r, o, s) {
    let i = this.top.children[o];
    return i.dirty == $t && i.dom == i.contentDOM && (i.dirty = qn), i.update(e, t, r, s) ? (this.destroyBetween(this.index, o), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let o = this.index; o < this.top.children.length; o++)
            if (this.top.children[o] == r)
              return o;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, o, s, i) {
    for (let a = this.index; a < this.top.children.length; a++) {
      let l = this.top.children[a];
      if (l instanceof xn) {
        let c = this.preMatch.matched.get(l);
        if (c != null && c != s)
          return !1;
        let u = l.dom, d, f = this.isLocked(u) && !(e.isText && l.node && l.node.isText && l.nodeDOM.nodeValue == e.text && l.dirty != $t && xl(t, l.outerDeco));
        if (!f && l.update(e, t, r, o))
          return this.destroyBetween(this.index, a), l.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(l, e, t, r, o, i)))
          return this.top.children[this.index] = d, d.dirty = qn, d.updateChildren(o, i + 1), d.dirty = pt, this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, o, s, i) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content))
      return null;
    let a = xn.create(this.top, t, r, o, s, i);
    if (!a.contentDOM)
      return null;
    a.children = e.children, e.children = [], e.destroy();
    for (let l of a.children)
      l.parent = a;
    return a;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, o, s) {
    let i = xn.create(this.top, e, t, r, o, s);
    i.contentDOM && i.updateChildren(o, s + 1), this.top.children.splice(this.index++, 0, i), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let o = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (o && o.matchesWidget(e) && (e == o.widget || !o.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new gh(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof sr; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof Pi) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((Ve || Be) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let o = new yh(this.top, [], r, null);
      t != this.top ? t.children.push(o) : t.children.splice(this.index++, 0, o), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function Uy(n, e) {
  let t = e, r = t.children.length, o = n.childCount, s = /* @__PURE__ */ new Map(), i = [];
  e:
    for (; o > 0; ) {
      let a;
      for (; ; )
        if (r) {
          let c = t.children[r - 1];
          if (c instanceof sr)
            t = c, r = c.children.length;
          else {
            a = c, r--;
            break;
          }
        } else {
          if (t == e)
            break e;
          r = t.parent.children.indexOf(t), t = t.parent;
        }
      let l = a.node;
      if (l) {
        if (l != n.child(o - 1))
          break;
        --o, s.set(a, o), i.push(a);
      }
    }
  return { index: o, matched: s, matches: i.reverse() };
}
function Wy(n, e) {
  return n.type.side - e.type.side;
}
function Ky(n, e, t, r) {
  let o = e.locals(n), s = 0;
  if (o.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, o, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let i = 0, a = [], l = null;
  for (let c = 0; ; ) {
    if (i < o.length && o[i].to == s) {
      let h = o[i++], m;
      for (; i < o.length && o[i].to == s; )
        (m || (m = [h])).push(o[i++]);
      if (m) {
        m.sort(Wy);
        for (let g = 0; g < m.length; g++)
          t(m[g], c, !!l);
      } else
        t(h, c, !!l);
    }
    let u, d;
    if (l)
      d = -1, u = l, l = null;
    else if (c < n.childCount)
      d = c, u = n.child(c++);
    else
      break;
    for (let h = 0; h < a.length; h++)
      a[h].to <= s && a.splice(h--, 1);
    for (; i < o.length && o[i].from <= s && o[i].to > s; )
      a.push(o[i++]);
    let f = s + u.nodeSize;
    if (u.isText) {
      let h = f;
      i < o.length && o[i].from < h && (h = o[i].from);
      for (let m = 0; m < a.length; m++)
        a[m].to < h && (h = a[m].to);
      h < f && (l = u.cut(h - s), u = u.cut(0, h - s), f = h, d = -1);
    }
    let p = u.isInline && !u.isLeaf ? a.filter((h) => !h.inline) : a.slice();
    r(u, p, e.forChild(s, u), d), s = f;
  }
}
function Jy(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function Gy(n, e) {
  for (; ; ) {
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.childNodes.length > e && n.childNodes[e].nodeType == 3)
        return n.childNodes[e];
      n = n.childNodes[e - 1], e = Lt(n);
    } else if (n.nodeType == 1 && e < n.childNodes.length)
      n = n.childNodes[e], e = 0;
    else
      return null;
  }
}
function Zy(n, e, t, r) {
  for (let o = 0, s = 0; o < n.childCount && s <= r; ) {
    let i = n.child(o++), a = s;
    if (s += i.nodeSize, !i.isText)
      continue;
    let l = i.text;
    for (; o < n.childCount; ) {
      let c = n.child(o++);
      if (s += c.nodeSize, !c.isText)
        break;
      l += c.text;
    }
    if (s >= t) {
      let c = a < r ? l.lastIndexOf(e, r - a - 1) : -1;
      if (c >= 0 && c + e.length + a >= t)
        return a + c;
      if (t == r && l.length >= r + e.length - a && l.slice(r - a, r - a + e.length) == e)
        return r;
    }
  }
  return -1;
}
function wl(n, e, t, r, o) {
  let s = [];
  for (let i = 0, a = 0; i < n.length; i++) {
    let l = n[i], c = a, u = a += l.size;
    c >= t || u <= e ? s.push(l) : (c < e && s.push(l.slice(0, e - c, r)), o && (s.push(o), o = void 0), u > t && s.push(l.slice(t - c, l.size, r)));
  }
  return s;
}
function kc(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let o = n.docView.nearestDesc(t.focusNode), s = o && o.size == 0, i = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (i < 0)
    return null;
  let a = r.resolve(i), l, c;
  if (Ri(t)) {
    for (l = a; o && !o.node; )
      o = o.parent;
    let u = o.node;
    if (o && u.isAtom && j.isSelectable(u) && o.parent && !(u.isInline && ky(t.focusNode, t.focusOffset, o.dom))) {
      let d = o.posBefore;
      c = new j(i == d ? a : r.resolve(d));
    }
  } else {
    let u = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (u < 0)
      return null;
    l = r.resolve(u);
  }
  if (!c) {
    let u = e == "pointer" || n.state.selection.head < a.pos && !s ? 1 : -1;
    c = xc(n, l, a, u);
  }
  return c;
}
function xh(n) {
  return n.editable ? n.hasFocus() : Sh(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function en(n, e = !1) {
  let t = n.state.selection;
  if (wh(n, t), !!xh(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && Be) {
      let r = n.domSelectionRange(), o = n.domObserver.currentSelection;
      if (r.anchorNode && o.anchorNode && or(r.anchorNode, r.anchorOffset, o.anchorNode, o.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      Xy(n);
    else {
      let { anchor: r, head: o } = t, s, i;
      ed && !(t instanceof G) && (t.$from.parent.inlineContent || (s = td(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (i = td(n, t.to))), n.docView.setSelection(r, o, n.root, e), ed && (s && nd(s), i && nd(i)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Yy(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const ed = Ve || Be && Sy < 63;
function td(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), o = r < t.childNodes.length ? t.childNodes[r] : null, s = r ? t.childNodes[r - 1] : null;
  if (Ve && o && o.contentEditable == "false")
    return xa(o);
  if ((!o || o.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (o)
      return xa(o);
    if (s)
      return xa(s);
  }
}
function xa(n) {
  return n.contentEditable = "true", Ve && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function nd(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function Yy(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, o = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != o) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!xh(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function Xy(n) {
  let e = n.domSelection(), t = document.createRange(), r = n.cursorWrapper.dom, o = r.nodeName == "IMG";
  o ? t.setEnd(r.parentNode, ze(r) + 1) : t.setEnd(r, 0), t.collapse(!1), e.removeAllRanges(), e.addRange(t), !o && !n.state.selection.visible && Xe && kn <= 11 && (r.disabled = !0, r.disabled = !1);
}
function wh(n, e) {
  if (e instanceof j) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (rd(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    rd(n);
}
function rd(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function xc(n, e, t, r) {
  return n.someProp("createSelectionBetween", (o) => o(n, e, t)) || G.between(e, t, r);
}
function od(n) {
  return n.editable && !n.hasFocus() ? !1 : Sh(n);
}
function Sh(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function Qy(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return or(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Sl(n, e) {
  let { $anchor: t, $head: r } = n.selection, o = e > 0 ? t.max(r) : t.min(r), s = o.parent.inlineContent ? o.depth ? n.doc.resolve(e > 0 ? o.after() : o.before()) : null : o;
  return s && X.findFrom(s, e);
}
function In(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function sd(n, e, t) {
  let r = n.state.selection;
  if (r instanceof G) {
    if (!r.empty || t.indexOf("s") > -1)
      return !1;
    if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
      let o = Sl(n.state, e);
      return o && o instanceof j ? In(n, o) : !1;
    } else if (!(ut && t.indexOf("m") > -1)) {
      let o = r.$head, s = o.textOffset ? null : e < 0 ? o.nodeBefore : o.nodeAfter, i;
      if (!s || s.isText)
        return !1;
      let a = e < 0 ? o.pos - s.nodeSize : o.pos;
      return s.isAtom || (i = n.docView.descAt(a)) && !i.contentDOM ? j.isSelectable(s) ? In(n, new j(e < 0 ? n.state.doc.resolve(o.pos - s.nodeSize) : o)) : Li ? In(n, new G(n.state.doc.resolve(e < 0 ? a : a + s.nodeSize))) : !1 : !1;
    }
  } else {
    if (r instanceof j && r.node.isInline)
      return In(n, new G(e > 0 ? r.$to : r.$from));
    {
      let o = Sl(n.state, e);
      return o ? In(n, o) : !1;
    }
  }
}
function Ws(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function xo(n) {
  if (n.contentEditable == "false")
    return !0;
  let e = n.pmViewDesc;
  return e && e.size == 0 && (n.nextSibling || n.nodeName != "BR");
}
function uo(n, e) {
  return e < 0 ? eb(n) : Ch(n);
}
function eb(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let o, s, i = !1;
  for (At && t.nodeType == 1 && r < Ws(t) && xo(t.childNodes[r]) && (i = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let a = t.childNodes[r - 1];
        if (xo(a))
          o = t, s = --r;
        else if (a.nodeType == 3)
          t = a, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (Eh(t))
        break;
      {
        let a = t.previousSibling;
        for (; a && xo(a); )
          o = t.parentNode, s = ze(a), a = a.previousSibling;
        if (a)
          t = a, r = Ws(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  i ? Cl(n, t, r) : o && Cl(n, o, s);
}
function Ch(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let o = Ws(t), s, i;
  for (; ; )
    if (r < o) {
      if (t.nodeType != 1)
        break;
      let a = t.childNodes[r];
      if (xo(a))
        s = t, i = ++r;
      else
        break;
    } else {
      if (Eh(t))
        break;
      {
        let a = t.nextSibling;
        for (; a && xo(a); )
          s = a.parentNode, i = ze(a) + 1, a = a.nextSibling;
        if (a)
          t = a, r = 0, o = Ws(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = o = 0;
        }
      }
    }
  s && Cl(n, s, i);
}
function Eh(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function tb(n, e) {
  for (; n && e == n.childNodes.length && !bc(n); )
    e = ze(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    if (n = n.childNodes[e], n.nodeType == 3)
      return n;
    e = 0;
  }
}
function nb(n, e) {
  for (; n && !e && !bc(n); )
    e = ze(n), n = n.parentNode;
  for (; n && e; ) {
    if (n = n.childNodes[e - 1], n.nodeType == 3)
      return n;
    e = n.childNodes.length;
  }
}
function Cl(n, e, t) {
  if (e.nodeType != 3) {
    let s, i;
    (i = tb(e, t)) ? (e = i, t = 0) : (s = nb(e, t)) && (e = s, t = s.nodeValue.length);
  }
  let r = n.domSelection();
  if (Ri(r)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), r.removeAllRanges(), r.addRange(s);
  } else
    r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: o } = n;
  setTimeout(() => {
    n.state == o && en(n);
  }, 50);
}
function id(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(Be || Cy) && t.parent.inlineContent) {
    let o = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1), i = (s.top + s.bottom) / 2;
      if (i > o.top && i < o.bottom && Math.abs(s.left - o.left) > 1)
        return s.left < o.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1), i = (s.top + s.bottom) / 2;
      if (i > o.top && i < o.bottom && Math.abs(s.left - o.left) > 1)
        return s.left > o.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function ad(n, e, t) {
  let r = n.state.selection;
  if (r instanceof G && !r.empty || t.indexOf("s") > -1 || ut && t.indexOf("m") > -1)
    return !1;
  let { $from: o, $to: s } = r;
  if (!o.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let i = Sl(n.state, e);
    if (i && i instanceof j)
      return In(n, i);
  }
  if (!o.parent.inlineContent) {
    let i = e < 0 ? o : s, a = r instanceof St ? X.near(i, e) : X.findFrom(i, e);
    return a ? In(n, a) : !1;
  }
  return !1;
}
function ld(n, e) {
  if (!(n.state.selection instanceof G))
    return !0;
  let { $head: t, $anchor: r, empty: o } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!o)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let i = n.state.tr;
    return e < 0 ? i.delete(t.pos - s.nodeSize, t.pos) : i.delete(t.pos, t.pos + s.nodeSize), n.dispatch(i), !0;
  }
  return !1;
}
function cd(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function rb(n) {
  if (!Ve || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    cd(n, r, "true"), setTimeout(() => cd(n, r, "false"), 20);
  }
  return !1;
}
function ob(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function sb(n, e) {
  let t = e.keyCode, r = ob(e);
  if (t == 8 || ut && t == 72 && r == "c")
    return ld(n, -1) || uo(n, -1);
  if (t == 46 && !e.shiftKey || ut && t == 68 && r == "c")
    return ld(n, 1) || uo(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || ut && t == 66 && r == "c") {
    let o = t == 37 ? id(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return sd(n, o, r) || uo(n, o);
  } else if (t == 39 || ut && t == 70 && r == "c") {
    let o = t == 39 ? id(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return sd(n, o, r) || uo(n, o);
  } else {
    if (t == 38 || ut && t == 80 && r == "c")
      return ad(n, -1, r) || uo(n, -1);
    if (t == 40 || ut && t == 78 && r == "c")
      return rb(n) || ad(n, 1, r) || Ch(n);
    if (r == (ut ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function Ah(n, e) {
  n.someProp("transformCopied", (p) => {
    e = p(e, n);
  });
  let t = [], { content: r, openStart: o, openEnd: s } = e;
  for (; o > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    o--, s--;
    let p = r.firstChild;
    t.push(p.type.name, p.attrs != p.type.defaultAttrs ? p.attrs : null), r = p.content;
  }
  let i = n.someProp("clipboardSerializer") || Pt.fromSchema(n.state.schema), a = Nh(), l = a.createElement("div");
  l.appendChild(i.serializeFragment(r, { document: a }));
  let c = l.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = _h[c.nodeName.toLowerCase()]); ) {
    for (let p = u.length - 1; p >= 0; p--) {
      let h = a.createElement(u[p]);
      for (; l.firstChild; )
        h.appendChild(l.firstChild);
      l.appendChild(h), d++;
    }
    c = l.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${o} ${s}${d ? ` -${d}` : ""} ${JSON.stringify(t)}`);
  let f = n.someProp("clipboardTextSerializer", (p) => p(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: l, text: f };
}
function Th(n, e, t, r, o) {
  let s = o.parent.type.spec.code, i, a;
  if (!t && !e)
    return null;
  let l = e && (r || s || !t);
  if (l) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, s || r, n);
    }), s)
      return e ? new R(M.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : R.empty;
    let d = n.someProp("clipboardTextParser", (f) => f(e, o, r, n));
    if (d)
      a = d;
    else {
      let f = o.marks(), { schema: p } = n.state, h = Pt.fromSchema(p);
      i = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = i.appendChild(document.createElement("p"));
        m && g.appendChild(h.serializeNode(p.text(m, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), i = lb(t), Li && cb(i);
  let c = i && i.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = i.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      i = f;
    }
  if (a || (a = (n.someProp("clipboardParser") || n.someProp("domParser") || rr.fromSchema(n.state.schema)).parseSlice(i, {
    preserveWhitespace: !!(l || u),
    context: o,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !ib.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    a = ub(ud(a, +u[1], +u[2]), u[4]);
  else if (a = R.maxOpen(ab(a.content, o), !0), a.openStart || a.openEnd) {
    let d = 0, f = 0;
    for (let p = a.content.firstChild; d < a.openStart && !p.type.spec.isolating; d++, p = p.firstChild)
      ;
    for (let p = a.content.lastChild; f < a.openEnd && !p.type.spec.isolating; f++, p = p.lastChild)
      ;
    a = ud(a, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    a = d(a, n);
  }), a;
}
const ib = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function ab(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let o = e.node(t).contentMatchAt(e.index(t)), s, i = [];
    if (n.forEach((a) => {
      if (!i)
        return;
      let l = o.findWrapping(a.type), c;
      if (!l)
        return i = null;
      if (c = i.length && s.length && Mh(l, s, a, i[i.length - 1], 0))
        i[i.length - 1] = c;
      else {
        i.length && (i[i.length - 1] = Dh(i[i.length - 1], s.length));
        let u = Oh(a, l);
        i.push(u), o = o.matchType(u.type), s = l;
      }
    }), i)
      return M.from(i);
  }
  return n;
}
function Oh(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, M.from(n));
  return n;
}
function Mh(n, e, t, r, o) {
  if (o < n.length && o < e.length && n[o] == e[o]) {
    let s = Mh(n, e, t, r.lastChild, o + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(o == n.length - 1 ? t.type : n[o + 1]))
      return r.copy(r.content.append(M.from(Oh(t, n, o + 1))));
  }
}
function Dh(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, Dh(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(M.empty, !0);
  return n.copy(t.append(r));
}
function El(n, e, t, r, o, s) {
  let i = e < 0 ? n.firstChild : n.lastChild, a = i.content;
  return n.childCount > 1 && (s = 0), o < r - 1 && (a = El(a, e, t, r, o + 1, s)), o >= t && (a = e < 0 ? i.contentMatchAt(0).fillBefore(a, s <= o).append(a) : a.append(i.contentMatchAt(i.childCount).fillBefore(M.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, i.copy(a));
}
function ud(n, e, t) {
  return e < n.openStart && (n = new R(El(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new R(El(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const _h = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let dd = null;
function Nh() {
  return dd || (dd = document.implementation.createHTMLDocument("title"));
}
function lb(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = Nh().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), o;
  if ((o = r && _h[r[1].toLowerCase()]) && (n = o.map((s) => "<" + s + ">").join("") + n + o.map((s) => "</" + s + ">").reverse().join("")), t.innerHTML = n, o)
    for (let s = 0; s < o.length; s++)
      t = t.querySelector(o[s]) || t;
  return t;
}
function cb(n) {
  let e = n.querySelectorAll(Be ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function ub(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: o, openStart: s, openEnd: i } = n;
  for (let a = r.length - 2; a >= 0; a -= 2) {
    let l = t.nodes[r[a]];
    if (!l || l.hasRequiredAttrs())
      break;
    o = M.from(l.create(r[a + 1], o)), s++, i++;
  }
  return new R(o, s, i);
}
const Ue = {}, We = {}, db = { touchstart: !0, touchmove: !0 };
class fb {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastAndroidDelete = 0, this.composing = !1, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function pb(n) {
  for (let e in Ue) {
    let t = Ue[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      mb(n, r) && !wc(n, r) && (n.editable || !(r.type in We)) && t(n, r);
    }, db[e] ? { passive: !0 } : void 0);
  }
  Ve && n.dom.addEventListener("input", () => null), Al(n);
}
function vn(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function hb(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function Al(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => wc(n, r));
  });
}
function wc(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function mb(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function gb(n, e) {
  !wc(n, e) && Ue[e.type] && (n.editable || !(e.type in We)) && Ue[e.type](n, e);
}
We.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !Lh(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(kt && Be && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), Hr && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (o) => o(n, Pn(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else
      n.someProp("handleKeyDown", (r) => r(n, t)) || sb(n, t) ? t.preventDefault() : vn(n, "key");
};
We.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
We.keypress = (n, e) => {
  let t = e;
  if (Lh(n, t) || !t.charCode || t.ctrlKey && !t.altKey || ut && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (o) => o(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof G) || !r.$from.sameParent(r.$to)) {
    let o = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(o) && !n.someProp("handleTextInput", (s) => s(n, r.$from.pos, r.$to.pos, o)) && n.dispatch(n.state.tr.insertText(o).scrollIntoView()), t.preventDefault();
  }
};
function Ii(n) {
  return { left: n.clientX, top: n.clientY };
}
function yb(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function Sc(n, e, t, r, o) {
  if (r == -1)
    return !1;
  let s = n.state.doc.resolve(r);
  for (let i = s.depth + 1; i > 0; i--)
    if (n.someProp(e, (a) => i > s.depth ? a(n, t, s.nodeAfter, s.before(i), o, !0) : a(n, t, s.node(i), s.before(i), o, !1)))
      return !0;
  return !1;
}
function Br(n, e, t) {
  n.focused || n.focus();
  let r = n.state.tr.setSelection(e);
  t == "pointer" && r.setMeta("pointer", !0), n.dispatch(r);
}
function bb(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && j.isSelectable(r) ? (Br(n, new j(t), "pointer"), !0) : !1;
}
function vb(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, o;
  t instanceof j && (r = t.node);
  let s = n.state.doc.resolve(e);
  for (let i = s.depth + 1; i > 0; i--) {
    let a = i > s.depth ? s.nodeAfter : s.node(i);
    if (j.isSelectable(a)) {
      r && t.$from.depth > 0 && i >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? o = s.before(t.$from.depth) : o = s.before(i);
      break;
    }
  }
  return o != null ? (Br(n, j.create(n.state.doc, o), "pointer"), !0) : !1;
}
function kb(n, e, t, r, o) {
  return Sc(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (s) => s(n, e, r)) || (o ? vb(n, t) : bb(n, t));
}
function xb(n, e, t, r) {
  return Sc(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (o) => o(n, e, r));
}
function wb(n, e, t, r) {
  return Sc(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (o) => o(n, e, r)) || Sb(n, t, r);
}
function Sb(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (Br(n, G.create(r, 0, r.content.size), "pointer"), !0) : !1;
  let o = r.resolve(e);
  for (let s = o.depth + 1; s > 0; s--) {
    let i = s > o.depth ? o.nodeAfter : o.node(s), a = o.before(s);
    if (i.inlineContent)
      Br(n, G.create(r, a + 1, a + 1 + i.content.size), "pointer");
    else if (j.isSelectable(i))
      Br(n, j.create(r, a), "pointer");
    else
      continue;
    return !0;
  }
}
function Cc(n) {
  return Ks(n);
}
const Rh = ut ? "metaKey" : "ctrlKey";
Ue.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = Cc(n), o = Date.now(), s = "singleClick";
  o - n.input.lastClick.time < 500 && yb(t, n.input.lastClick) && !t[Rh] && (n.input.lastClick.type == "singleClick" ? s = "doubleClick" : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")), n.input.lastClick = { time: o, x: t.clientX, y: t.clientY, type: s };
  let i = n.posAtCoords(Ii(t));
  i && (s == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new Cb(n, i, t, !!r)) : (s == "doubleClick" ? xb : wb)(n, i.pos, i.inside, t) ? t.preventDefault() : vn(n, "pointer"));
};
class Cb {
  constructor(e, t, r, o) {
    this.view = e, this.pos = t, this.event = r, this.flushed = o, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[Rh], this.allowDefault = r.shiftKey;
    let s, i;
    if (t.inside > -1)
      s = e.state.doc.nodeAt(t.inside), i = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      s = u.parent, i = u.depth ? u.before() : 0;
    }
    const a = o ? null : r.target, l = a ? e.docView.nearestDesc(a, !0) : null;
    this.target = l ? l.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof j && c.from <= i && c.to > i) && (this.mightDrag = {
      node: s,
      pos: i,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && At && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), vn(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => en(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Ii(e))), this.updateAllowDefault(e), this.allowDefault || !t ? vn(this.view, "pointer") : kb(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    Ve && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    Be && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Br(this.view, X.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : vn(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), vn(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Ue.touchstart = (n) => {
  n.input.lastTouch = Date.now(), Cc(n), vn(n, "pointer");
};
Ue.touchmove = (n) => {
  n.input.lastTouch = Date.now(), vn(n, "pointer");
};
Ue.contextmenu = (n) => Cc(n);
function Lh(n, e) {
  return n.composing ? !0 : Ve && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const Eb = kt ? 5e3 : -1;
We.compositionstart = We.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$from;
    if (e.selection.empty && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), Ks(n, !0), n.markCursor = null;
    else if (Ks(n), At && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let o = r.focusNode, s = r.focusOffset; o && o.nodeType == 1 && s != 0; ) {
        let i = s < 0 ? o.lastChild : o.childNodes[s - 1];
        if (!i)
          break;
        if (i.nodeType == 3) {
          n.domSelection().collapse(i, i.nodeValue.length);
          break;
        } else
          o = i, s = -1;
      }
    }
    n.input.composing = !0;
  }
  Ph(n, Eb);
};
We.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, Ph(n, 20));
};
function Ph(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => Ks(n), e));
}
function Ih(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Ab()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function Ab() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function Ks(n, e = !1) {
  if (!(kt && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), Ih(n), e || n.docView && n.docView.dirty) {
      let t = kc(n);
      return t && !t.eq(n.state.selection) ? n.dispatch(n.state.tr.setSelection(t)) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function Tb(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), o = document.createRange();
  o.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(o), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const jr = Xe && kn < 15 || Hr && Ey < 604;
Ue.copy = We.cut = (n, e) => {
  let t = e, r = n.state.selection, o = t.type == "cut";
  if (r.empty)
    return;
  let s = jr ? null : t.clipboardData, i = r.content(), { dom: a, text: l } = Ah(n, i);
  s ? (t.preventDefault(), s.clearData(), s.setData("text/html", a.innerHTML), s.setData("text/plain", l)) : Tb(n, a), o && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Ob(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function Mb(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let o = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? Ro(n, r.value, null, o, e) : Ro(n, r.textContent, r.innerHTML, o, e);
  }, 50);
}
function Ro(n, e, t, r, o) {
  let s = Th(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (l) => l(n, o, s || R.empty)))
    return !0;
  if (!s)
    return !1;
  let i = Ob(s), a = i ? n.state.tr.replaceSelectionWith(i, r) : n.state.tr.replaceSelection(s);
  return n.dispatch(a.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
We.paste = (n, e) => {
  let t = e;
  if (n.composing && !kt)
    return;
  let r = jr ? null : t.clipboardData, o = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && Ro(n, r.getData("text/plain"), r.getData("text/html"), o, t) ? t.preventDefault() : Mb(n, t);
};
class Db {
  constructor(e, t) {
    this.slice = e, this.move = t;
  }
}
const Bh = ut ? "altKey" : "ctrlKey";
Ue.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let o = n.state.selection, s = o.empty ? null : n.posAtCoords(Ii(t));
  if (!(s && s.pos >= o.from && s.pos <= (o instanceof j ? o.to - 1 : o.to))) {
    if (r && r.mightDrag)
      n.dispatch(n.state.tr.setSelection(j.create(n.state.doc, r.mightDrag.pos)));
    else if (t.target && t.target.nodeType == 1) {
      let c = n.docView.nearestDesc(t.target, !0);
      c && c.node.type.spec.draggable && c != n.docView && n.dispatch(n.state.tr.setSelection(j.create(n.state.doc, c.posBefore)));
    }
  }
  let i = n.state.selection.content(), { dom: a, text: l } = Ah(n, i);
  t.dataTransfer.clearData(), t.dataTransfer.setData(jr ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", jr || t.dataTransfer.setData("text/plain", l), n.dragging = new Db(i, !t[Bh]);
};
Ue.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
We.dragover = We.dragenter = (n, e) => e.preventDefault();
We.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let o = n.posAtCoords(Ii(t));
  if (!o)
    return;
  let s = n.state.doc.resolve(o.pos), i = r && r.slice;
  i ? n.someProp("transformPasted", (h) => {
    i = h(i, n);
  }) : i = Th(n, t.dataTransfer.getData(jr ? "Text" : "text/plain"), jr ? null : t.dataTransfer.getData("text/html"), !1, s);
  let a = !!(r && !t[Bh]);
  if (n.someProp("handleDrop", (h) => h(n, t, i || R.empty, a))) {
    t.preventDefault();
    return;
  }
  if (!i)
    return;
  t.preventDefault();
  let l = i ? th(n.state.doc, s.pos, i) : s.pos;
  l == null && (l = s.pos);
  let c = n.state.tr;
  a && c.deleteSelection();
  let u = c.mapping.map(l), d = i.openStart == 0 && i.openEnd == 0 && i.content.childCount == 1, f = c.doc;
  if (d ? c.replaceRangeWith(u, u, i.content.firstChild) : c.replaceRange(u, u, i), c.doc.eq(f))
    return;
  let p = c.doc.resolve(u);
  if (d && j.isSelectable(i.content.firstChild) && p.nodeAfter && p.nodeAfter.sameMarkup(i.content.firstChild))
    c.setSelection(new j(p));
  else {
    let h = c.mapping.map(l);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, g, b, v) => h = v), c.setSelection(xc(n, p, c.doc.resolve(h)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
Ue.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && en(n);
  }, 20));
};
Ue.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Ue.beforeinput = (n, e) => {
  if (Be && kt && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (s) => s(n, Pn(8, "Backspace")))))
        return;
      let { $cursor: o } = n.state.selection;
      o && o.pos > 0 && n.dispatch(n.state.tr.delete(o.pos - 1, o.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in We)
  Ue[n] = We[n];
function Lo(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class Ec {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || Gn, this.side = this.spec.side || 0;
  }
  map(e, t, r, o) {
    let { pos: s, deleted: i } = e.mapResult(t.from + o, this.side < 0 ? -1 : 1);
    return i ? null : new $e(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Ec && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Lo(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class wn {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Gn;
  }
  map(e, t, r, o) {
    let s = e.map(t.from + o, this.spec.inclusiveStart ? -1 : 1) - r, i = e.map(t.to + o, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= i ? null : new $e(s, i, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof wn && Lo(this.attrs, e.attrs) && Lo(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof wn;
  }
  destroy() {
  }
}
class Ac {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Gn;
  }
  map(e, t, r, o) {
    let s = e.mapResult(t.from + o, 1);
    if (s.deleted)
      return null;
    let i = e.mapResult(t.to + o, -1);
    return i.deleted || i.pos <= s.pos ? null : new $e(s.pos - r, i.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: o } = e.content.findIndex(t.from), s;
    return o == t.from && !(s = e.child(r)).isText && o + s.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof Ac && Lo(this.attrs, e.attrs) && Lo(this.spec, e.spec);
  }
  destroy() {
  }
}
class $e {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new $e(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new $e(e, e, new Ec(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, o) {
    return new $e(e, t, new wn(r, o));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, o) {
    return new $e(e, t, new Ac(r, o));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof wn;
  }
}
const Sr = [], Gn = {};
class me {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : Sr, this.children = t.length ? t : Sr;
  }
  /**
  Create a set of decorations, using the structure of the given
  document.
  */
  static create(e, t) {
    return t.length ? Js(t, e, 0, Gn) : Ie;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let o = [];
    return this.findInner(e ?? 0, t ?? 1e9, o, 0, r), o;
  }
  findInner(e, t, r, o, s) {
    for (let i = 0; i < this.local.length; i++) {
      let a = this.local[i];
      a.from <= t && a.to >= e && (!s || s(a.spec)) && r.push(a.copy(a.from + o, a.to + o));
    }
    for (let i = 0; i < this.children.length; i += 3)
      if (this.children[i] < t && this.children[i + 1] > e) {
        let a = this.children[i] + 1;
        this.children[i + 2].findInner(e - a, t - a, r, o + a, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == Ie || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || Gn);
  }
  /**
  @internal
  */
  mapInner(e, t, r, o, s) {
    let i;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a].map(e, r, o);
      l && l.type.valid(t, l) ? (i || (i = [])).push(l) : s.onRemove && s.onRemove(this.local[a].spec);
    }
    return this.children.length ? _b(this.children, i || [], e, t, r, o, s) : i ? new me(i.sort(Zn), Sr) : Ie;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Needs access to the current document to
  create the appropriate tree structure.
  */
  add(e, t) {
    return t.length ? this == Ie ? me.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let o, s = 0;
    e.forEach((a, l) => {
      let c = l + r, u;
      if (u = qh(t, a, c)) {
        for (o || (o = this.children.slice()); s < o.length && o[s] < l; )
          s += 3;
        o[s] == l ? o[s + 2] = o[s + 2].addInner(a, u, c + 1) : o.splice(s, 0, l, l + a.nodeSize, Js(u, a, c + 1, Gn)), s += 3;
      }
    });
    let i = Fh(s ? zh(t) : t, -r);
    for (let a = 0; a < i.length; a++)
      i[a].type.valid(e, i[a]) || i.splice(a--, 1);
    return new me(i.length ? this.local.concat(i).sort(Zn) : this.local, o || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == Ie ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, o = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let i, a = r[s] + t, l = r[s + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > a && d.to < l && (e[u] = null, (i || (i = [])).push(d));
      if (!i)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(i, a + 1);
      c != Ie ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (o.length) {
      for (let s = 0, i; s < e.length; s++)
        if (i = e[s])
          for (let a = 0; a < o.length; a++)
            o[a].eq(i, t) && (o == this.local && (o = this.local.slice()), o.splice(a--, 1));
    }
    return r == this.children && o == this.local ? this : o.length || r.length ? new me(o, r) : Ie;
  }
  /**
  @internal
  */
  forChild(e, t) {
    if (this == Ie)
      return this;
    if (t.isLeaf)
      return me.empty;
    let r, o;
    for (let a = 0; a < this.children.length; a += 3)
      if (this.children[a] >= e) {
        this.children[a] == e && (r = this.children[a + 2]);
        break;
      }
    let s = e + 1, i = s + t.content.size;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a];
      if (l.from < i && l.to > s && l.type instanceof wn) {
        let c = Math.max(s, l.from) - s, u = Math.min(i, l.to) - s;
        c < u && (o || (o = [])).push(l.copy(c, u));
      }
    }
    if (o) {
      let a = new me(o.sort(Zn), Sr);
      return r ? new mn([a, r]) : a;
    }
    return r || Ie;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof me) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return Tc(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == Ie)
      return Sr;
    if (e.inlineContent || !this.local.some(wn.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof wn || t.push(this.local[r]);
    return t;
  }
}
me.empty = new me([], []);
me.removeOverlap = Tc;
const Ie = me.empty;
class mn {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((o) => o.map(e, t, Gn));
    return mn.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return me.empty;
    let r = [];
    for (let o = 0; o < this.members.length; o++) {
      let s = this.members[o].forChild(e, t);
      s != Ie && (s instanceof mn ? r = r.concat(s.members) : r.push(s));
    }
    return mn.from(r);
  }
  eq(e) {
    if (!(e instanceof mn) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let o = 0; o < this.members.length; o++) {
      let s = this.members[o].localsInner(e);
      if (s.length)
        if (!t)
          t = s;
        else {
          r && (t = t.slice(), r = !1);
          for (let i = 0; i < s.length; i++)
            t.push(s[i]);
        }
    }
    return t ? Tc(r ? t : t.sort(Zn)) : Sr;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return Ie;
      case 1:
        return e[0];
      default:
        return new mn(e.every((t) => t instanceof me) ? e : e.reduce((t, r) => t.concat(r instanceof me ? r : r.members), []));
    }
  }
}
function _b(n, e, t, r, o, s, i) {
  let a = n.slice();
  for (let c = 0, u = s; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, p, h, m) => {
      let g = m - h - (p - f);
      for (let b = 0; b < a.length; b += 3) {
        let v = a[b + 1];
        if (v < 0 || f > v + u - d)
          continue;
        let x = a[b] + u - d;
        p >= x ? a[b + 1] = f <= x ? -2 : -1 : h >= o && g && (a[b] += g, a[b + 1] += g);
      }
      d += g;
    }), u = t.maps[c].map(u, -1);
  }
  let l = !1;
  for (let c = 0; c < a.length; c += 3)
    if (a[c + 1] < 0) {
      if (a[c + 1] == -2) {
        l = !0, a[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + s), d = u - o;
      if (d < 0 || d >= r.content.size) {
        l = !0;
        continue;
      }
      let f = t.map(n[c + 1] + s, -1), p = f - o, { index: h, offset: m } = r.content.findIndex(d), g = r.maybeChild(h);
      if (g && m == d && m + g.nodeSize == p) {
        let b = a[c + 2].mapInner(t, g, u + 1, n[c] + s + 1, i);
        b != Ie ? (a[c] = d, a[c + 1] = p, a[c + 2] = b) : (a[c + 1] = -2, l = !0);
      } else
        l = !0;
    }
  if (l) {
    let c = Nb(a, n, e, t, o, s, i), u = Js(c, r, 0, i);
    e = u.local;
    for (let d = 0; d < a.length; d += 3)
      a[d + 1] < 0 && (a.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let p = u.children[d];
      for (; f < a.length && a[f] < p; )
        f += 3;
      a.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new me(e.sort(Zn), a);
}
function Fh(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let o = n[r];
    t.push(new $e(o.from + e, o.to + e, o.type));
  }
  return t;
}
function Nb(n, e, t, r, o, s, i) {
  function a(l, c) {
    for (let u = 0; u < l.local.length; u++) {
      let d = l.local[u].map(r, o, c);
      d ? t.push(d) : i.onRemove && i.onRemove(l.local[u].spec);
    }
    for (let u = 0; u < l.children.length; u += 3)
      a(l.children[u + 2], l.children[u] + c + 1);
  }
  for (let l = 0; l < n.length; l += 3)
    n[l + 1] == -1 && a(n[l + 2], e[l] + s + 1);
  return t;
}
function qh(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, o = null;
  for (let s = 0, i; s < n.length; s++)
    (i = n[s]) && i.from > t && i.to < r && ((o || (o = [])).push(i), n[s] = null);
  return o;
}
function zh(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function Js(n, e, t, r) {
  let o = [], s = !1;
  e.forEach((a, l) => {
    let c = qh(n, a, l + t);
    if (c) {
      s = !0;
      let u = Js(c, a, t + l + 1, r);
      u != Ie && o.push(l, l + a.nodeSize, u);
    }
  });
  let i = Fh(s ? zh(n) : n, -t).sort(Zn);
  for (let a = 0; a < i.length; a++)
    i[a].type.valid(e, i[a]) || (r.onRemove && r.onRemove(i[a].spec), i.splice(a--, 1));
  return i.length || o.length ? new me(i, o) : Ie;
}
function Zn(n, e) {
  return n.from - e.from || n.to - e.to;
}
function Tc(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let o = t + 1; o < e.length; o++) {
        let s = e[o];
        if (s.from == r.from) {
          s.to != r.to && (e == n && (e = n.slice()), e[o] = s.copy(s.from, r.to), fd(e, o + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, s.from), fd(e, o, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function fd(n, e, t) {
  for (; e < n.length && Zn(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function wa(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != Ie && e.push(r);
  }), n.cursorWrapper && e.push(me.create(n.state.doc, [n.cursorWrapper.deco])), mn.from(e);
}
const Rb = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, Lb = Xe && kn <= 11;
class Pb {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class Ib {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Pb(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let o = 0; o < r.length; o++)
        this.queue.push(r[o]);
      Xe && kn <= 11 && r.some((o) => o.type == "childList" && o.removedNodes.length || o.type == "characterData" && o.oldValue.length > o.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), Lb && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Rb)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (od(this.view)) {
      if (this.suppressingSelectionUpdates)
        return en(this.view);
      if (Xe && kn <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && or(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = No(s))
      t.add(s);
    for (let s = e.anchorNode; s; s = No(s))
      if (t.has(s)) {
        r = s;
        break;
      }
    let o = r && this.view.docView.nearestDesc(r);
    if (o && o.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), o = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && od(e) && !this.ignoreSelectionChange(r), s = -1, i = -1, a = !1, l = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], l);
        d && (s = s < 0 ? d.from : Math.min(d.from, s), i = i < 0 ? d.to : Math.max(d.to, i), d.typeOver && (a = !0));
      }
    if (At && l.length > 1) {
      let u = l.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let d = u[0], f = u[1];
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      }
    }
    let c = null;
    s < 0 && o && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && Ri(r) && (c = kc(e)) && c.eq(X.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, en(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || o) && (s > -1 && (e.docView.markDirty(s, i), Bb(e)), this.handleDOMChange(s, i, a, l), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || en(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++)
        t.push(e.addedNodes[u]);
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let o = e.previousSibling, s = e.nextSibling;
      if (Xe && kn <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (o = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (s = f);
        }
      let i = o && o.parentNode == e.target ? ze(o) + 1 : 0, a = r.localPosFromDOM(e.target, i, -1), l = s && s.parentNode == e.target ? ze(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, l, 1);
      return { from: a, to: c };
    } else
      return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : {
        from: r.posAtStart,
        to: r.posAtEnd,
        // An event was generated for a text change that didn't change
        // any text. Mark the dom change to fall back to assuming the
        // selection was typed over with an identical value if it can't
        // find another change.
        typeOver: e.target.nodeValue == e.oldValue
      };
  }
}
let pd = /* @__PURE__ */ new WeakMap(), hd = !1;
function Bb(n) {
  if (!pd.has(n) && (pd.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = At, hd)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), hd = !0;
  }
}
function Fb(n) {
  let e;
  function t(l) {
    l.preventDefault(), l.stopImmediatePropagation(), e = l.getTargetRanges()[0];
  }
  n.dom.addEventListener("beforeinput", t, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", t, !0);
  let r = e.startContainer, o = e.startOffset, s = e.endContainer, i = e.endOffset, a = n.domAtPos(n.state.selection.anchor);
  return or(a.node, a.offset, s, i) && ([r, o, s, i] = [s, i, r, o]), { anchorNode: r, anchorOffset: o, focusNode: s, focusOffset: i };
}
function qb(n, e, t) {
  let { node: r, fromOffset: o, toOffset: s, from: i, to: a } = n.docView.parseRange(e, t), l = n.domSelectionRange(), c, u = l.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: l.anchorOffset }], Ri(l) || c.push({ node: l.focusNode, offset: l.focusOffset })), Be && n.input.lastKeyCode === 8)
    for (let g = s; g > o; g--) {
      let b = r.childNodes[g - 1], v = b.pmViewDesc;
      if (b.nodeName == "BR" && !v) {
        s = g;
        break;
      }
      if (!v || v.size)
        break;
    }
  let d = n.state.doc, f = n.someProp("domParser") || rr.fromSchema(n.state.schema), p = d.resolve(i), h = null, m = f.parse(r, {
    topNode: p.parent,
    topMatch: p.parent.contentMatchAt(p.index()),
    topOpen: !0,
    from: o,
    to: s,
    preserveWhitespace: p.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: zb,
    context: p
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, b = c[1] && c[1].pos;
    b == null && (b = g), h = { anchor: g + i, head: b + i };
  }
  return { doc: m, sel: h, from: i, to: a };
}
function zb(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (Ve && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || Ve && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const $b = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function Hb(n, e, t, r, o) {
  let s = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let T = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, D = kc(n, T);
    if (D && !n.state.selection.eq(D)) {
      if (Be && kt && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (z) => z(n, Pn(13, "Enter"))))
        return;
      let N = n.state.tr.setSelection(D);
      T == "pointer" ? N.setMeta("pointer", !0) : T == "key" && N.scrollIntoView(), s && N.setMeta("composition", s), n.dispatch(N);
    }
    return;
  }
  let i = n.state.doc.resolve(e), a = i.sharedDepth(t);
  e = i.before(a + 1), t = n.state.doc.resolve(t).after(a + 1);
  let l = n.state.selection, c = qb(n, e, t), u = n.state.doc, d = u.slice(c.from, c.to), f, p;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, p = "end") : (f = n.state.selection.from, p = "start"), n.input.lastKeyCode = null;
  let h = Ub(d.content, c.doc.content, c.from, f, p);
  if ((Hr && n.input.lastIOSEnter > Date.now() - 225 || kt) && o.some((T) => T.nodeType == 1 && !$b.test(T.nodeName)) && (!h || h.endA >= h.endB) && n.someProp("handleKeyDown", (T) => T(n, Pn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!h)
    if (r && l instanceof G && !l.empty && l.$head.sameParent(l.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      h = { start: l.from, endA: l.to, endB: l.to };
    else {
      if (c.sel) {
        let T = md(n, n.state.doc, c.sel);
        if (T && !T.eq(n.state.selection)) {
          let D = n.state.tr.setSelection(T);
          s && D.setMeta("composition", s), n.dispatch(D);
        }
      }
      return;
    }
  if (Be && n.cursorWrapper && c.sel && c.sel.anchor == n.cursorWrapper.deco.from && c.sel.head == c.sel.anchor) {
    let T = h.endB - h.start;
    c.sel = { anchor: c.sel.anchor + T, head: c.sel.anchor + T };
  }
  n.input.domChangeCount++, n.state.selection.from < n.state.selection.to && h.start == h.endB && n.state.selection instanceof G && (h.start > n.state.selection.from && h.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? h.start = n.state.selection.from : h.endA < n.state.selection.to && h.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (h.endB += n.state.selection.to - h.endA, h.endA = n.state.selection.to)), Xe && kn <= 11 && h.endB == h.start + 1 && h.endA == h.start && h.start > c.from && c.doc.textBetween(h.start - c.from - 1, h.start - c.from + 1) == "  " && (h.start--, h.endA--, h.endB--);
  let m = c.doc.resolveNoCache(h.start - c.from), g = c.doc.resolveNoCache(h.endB - c.from), b = u.resolve(h.start), v = m.sameParent(g) && m.parent.inlineContent && b.end() >= h.endA, x;
  if ((Hr && n.input.lastIOSEnter > Date.now() - 225 && (!v || o.some((T) => T.nodeName == "DIV" || T.nodeName == "P")) || !v && m.pos < c.doc.content.size && !m.sameParent(g) && (x = X.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && x.head == g.pos) && n.someProp("handleKeyDown", (T) => T(n, Pn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > h.start && Vb(u, h.start, h.endA, m, g) && n.someProp("handleKeyDown", (T) => T(n, Pn(8, "Backspace")))) {
    kt && Be && n.domObserver.suppressSelectionUpdates();
    return;
  }
  Be && kt && h.endB == h.start && (n.input.lastAndroidDelete = Date.now()), kt && !v && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == h.endA && (h.endB -= 2, g = c.doc.resolveNoCache(h.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(T) {
      return T(n, Pn(13, "Enter"));
    });
  }, 20));
  let y = h.start, w = h.endA, k, S, E;
  if (v) {
    if (m.pos == g.pos)
      Xe && kn <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => en(n), 20)), k = n.state.tr.delete(y, w), S = u.resolve(h.start).marksAcross(u.resolve(h.endA));
    else if (
      // Adding or removing a mark
      h.endA == h.endB && (E = jb(m.parent.content.cut(m.parentOffset, g.parentOffset), b.parent.content.cut(b.parentOffset, h.endA - b.start())))
    )
      k = n.state.tr, E.type == "add" ? k.addMark(y, w, E.mark) : k.removeMark(y, w, E.mark);
    else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let T = m.parent.textBetween(m.parentOffset, g.parentOffset);
      if (n.someProp("handleTextInput", (D) => D(n, y, w, T)))
        return;
      k = n.state.tr.insertText(T, y, w);
    }
  }
  if (k || (k = n.state.tr.replace(y, w, c.doc.slice(h.start - c.from, h.endB - c.from))), c.sel) {
    let T = md(n, k.doc, c.sel);
    T && !(Be && kt && n.composing && T.empty && (h.start != h.endB || n.input.lastAndroidDelete < Date.now() - 100) && (T.head == y || T.head == k.mapping.map(w) - 1) || Xe && T.empty && T.head == y) && k.setSelection(T);
  }
  S && k.ensureMarks(S), s && k.setMeta("composition", s), n.dispatch(k.scrollIntoView());
}
function md(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : xc(n, e.resolve(t.anchor), e.resolve(t.head));
}
function jb(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, o = t, s = r, i, a, l;
  for (let u = 0; u < r.length; u++)
    o = r[u].removeFromSet(o);
  for (let u = 0; u < t.length; u++)
    s = t[u].removeFromSet(s);
  if (o.length == 1 && s.length == 0)
    a = o[0], i = "add", l = (u) => u.mark(a.addToSet(u.marks));
  else if (o.length == 0 && s.length == 1)
    a = s[0], i = "remove", l = (u) => u.mark(a.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(l(e.child(u)));
  if (M.from(c).eq(n))
    return { mark: a, type: i };
}
function Vb(n, e, t, r, o) {
  if (!r.parent.isTextblock || // The content must have shrunk
  t - e <= o.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
  Sa(r, !0, !1) < o.pos)
    return !1;
  let s = n.resolve(e);
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let i = n.resolve(Sa(s, !0, !0));
  return !i.parent.isTextblock || i.pos > t || Sa(i, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(i.parent.content);
}
function Sa(n, e, t) {
  let r = n.depth, o = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, o++, e = !1;
  if (t) {
    let s = n.node(r).maybeChild(n.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, o++;
  }
  return o;
}
function Ub(n, e, t, r, o) {
  let s = n.findDiffStart(e, t);
  if (s == null)
    return null;
  let { a: i, b: a } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (o == "end") {
    let l = Math.max(0, s - Math.min(i, a));
    r -= i + l - s;
  }
  if (i < s && n.size < e.size) {
    let l = r <= s && r >= i ? s - r : 0;
    s -= l, a = s + (a - i), i = s;
  } else if (a < s) {
    let l = r <= s && r >= a ? s - r : 0;
    s -= l, i = s + (i - a), a = s;
  }
  return { start: s, endA: i, endB: a };
}
class Wb {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new fb(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(kd), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = bd(this), yd(this), this.nodeViews = vd(this), this.docView = Xu(this.state.doc, gd(this), wa(this), this.dom, this), this.domObserver = new Ib(this, (r, o, s, i) => Hb(this, r, o, s, i)), this.domObserver.start(), pb(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Al(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(kd), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    let r = this.state, o = !1, s = !1;
    e.storedMarks && this.composing && (Ih(this), s = !0), this.state = e;
    let i = r.plugins != e.plugins || this._props.plugins != t.plugins;
    if (i || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let f = vd(this);
      Jb(f, this.nodeViews) && (this.nodeViews = f, o = !0);
    }
    (i || t.handleDOMEvents != this._props.handleDOMEvents) && Al(this), this.editable = bd(this), yd(this);
    let a = wa(this), l = gd(this), c = r.plugins != e.plugins && !r.doc.eq(e.doc) ? "reset" : e.scrollToSelection > r.scrollToSelection ? "to selection" : "preserve", u = o || !this.docView.matchesNode(e.doc, l, a);
    (u || !e.selection.eq(r.selection)) && (s = !0);
    let d = c == "preserve" && s && this.dom.style.overflowAnchor == null && Oy(this);
    if (s) {
      this.domObserver.stop();
      let f = u && (Xe || Be) && !this.composing && !r.selection.empty && !e.selection.empty && Kb(r.selection, e.selection);
      if (u) {
        let p = Be ? this.trackWrites = this.domSelectionRange().focusNode : null;
        (o || !this.docView.update(e.doc, l, a, this)) && (this.docView.updateOuterDeco([]), this.docView.destroy(), this.docView = Xu(e.doc, l, a, this.dom, this)), p && !this.trackWrites && (f = !0);
      }
      f || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && Qy(this)) ? en(this, f) : (wh(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(r), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : d && My(d);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!this.someProp("handleScrollToSelection", (t) => t(this)))
      if (this.state.selection instanceof j) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && Wu(this, t.getBoundingClientRect(), e);
      } else
        Wu(this, this.coordsAtPos(this.state.selection.head, 1), e);
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  someProp(e, t) {
    let r = this._props && this._props[e], o;
    if (r != null && (o = t ? t(r) : r))
      return o;
    for (let i = 0; i < this.directPlugins.length; i++) {
      let a = this.directPlugins[i].props[e];
      if (a != null && (o = t ? t(a) : a))
        return o;
    }
    let s = this.state.plugins;
    if (s)
      for (let i = 0; i < s.length; i++) {
        let a = s[i].props[e];
        if (a != null && (o = t ? t(a) : a))
          return o;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Xe) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && Dy(this.dom), en(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return Py(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return hh(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, r = -1) {
    let o = this.docView.posFromDOM(e, t, r);
    if (o == null)
      throw new RangeError("DOM position not inside the editor");
    return o;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return zy(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return Ro(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return Ro(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (hb(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], wa(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null);
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return gb(this, e);
  }
  /**
  Dispatch a transaction. Will call
  [`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
  when given, and otherwise defaults to applying the transaction to
  the current state and calling
  [`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
  This method is bound to the view instance, so that it can be
  easily passed around.
  */
  dispatch(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  /**
  @internal
  */
  domSelectionRange() {
    return Ve && this.root.nodeType === 11 && xy(this.dom.ownerDocument) == this.dom ? Fb(this) : this.domSelection();
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
function gd(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [$e.node(0, n.state.doc.content.size, e)];
}
function yd(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: $e.widget(n.state.selection.head, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function bd(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function Kb(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function vd(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let o in r)
      Object.prototype.hasOwnProperty.call(e, o) || (e[o] = r[o]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function Jb(n, e) {
  let t = 0, r = 0;
  for (let o in n) {
    if (n[o] != e[o])
      return !0;
    t++;
  }
  for (let o in e)
    r++;
  return t != r;
}
function kd(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var Cn = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Gs = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, Gb = typeof navigator < "u" && /Mac/.test(navigator.platform), Zb = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var Le = 0; Le < 10; Le++)
  Cn[48 + Le] = Cn[96 + Le] = String(Le);
for (var Le = 1; Le <= 24; Le++)
  Cn[Le + 111] = "F" + Le;
for (var Le = 65; Le <= 90; Le++)
  Cn[Le] = String.fromCharCode(Le + 32), Gs[Le] = String.fromCharCode(Le);
for (var Ca in Cn)
  Gs.hasOwnProperty(Ca) || (Gs[Ca] = Cn[Ca]);
function Yb(n) {
  var e = Gb && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || Zb && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Gs : Cn)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const Xb = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function Qb(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, o, s, i;
  for (let a = 0; a < e.length - 1; a++) {
    let l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      i = !0;
    else if (/^a(lt)?$/i.test(l))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      o = !0;
    else if (/^s(hift)?$/i.test(l))
      s = !0;
    else if (/^mod$/i.test(l))
      Xb ? i = !0 : o = !0;
    else
      throw new Error("Unrecognized modifier name: " + l);
  }
  return r && (t = "Alt-" + t), o && (t = "Ctrl-" + t), i && (t = "Meta-" + t), s && (t = "Shift-" + t), t;
}
function ev(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[Qb(t)] = n[t];
  return e;
}
function Ea(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function tv(n) {
  return new be({ props: { handleKeyDown: $h(n) } });
}
function $h(n) {
  let e = ev(n);
  return function(t, r) {
    let o = Yb(r), s, i = e[Ea(o, r)];
    if (i && i(t.state, t.dispatch, t))
      return !0;
    if (o.length == 1 && o != " ") {
      if (r.shiftKey) {
        let a = e[Ea(o, r, !1)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.shiftKey || r.altKey || r.metaKey || o.charCodeAt(0) > 127) && (s = Cn[r.keyCode]) && s != o) {
        let a = e[Ea(s, r)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const nv = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function rv(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const ov = (n, e, t) => {
  let r = rv(n, t);
  if (!r)
    return !1;
  let o = Hh(r);
  if (!o) {
    let i = r.blockRange(), a = i && Xr(i);
    return a == null ? !1 : (e && e(n.tr.lift(i, a).scrollIntoView()), !0);
  }
  let s = o.nodeBefore;
  if (!s.type.spec.isolating && Uh(n, o, e))
    return !0;
  if (r.parent.content.size == 0 && (Vr(s, "end") || j.isSelectable(s))) {
    let i = gc(n.doc, r.before(), r.after(), R.empty);
    if (i && i.slice.size < i.to - i.from) {
      if (e) {
        let a = n.tr.step(i);
        a.setSelection(Vr(s, "end") ? X.findFrom(a.doc.resolve(a.mapping.map(o.pos, -1)), -1) : j.create(a.doc, o.pos - s.nodeSize)), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && o.depth == r.depth - 1 ? (e && e(n.tr.delete(o.pos - s.nodeSize, o.pos).scrollIntoView()), !0) : !1;
};
function Vr(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const sv = (n, e, t) => {
  let { $head: r, empty: o } = n.selection, s = r;
  if (!o)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    s = Hh(r);
  }
  let i = s && s.nodeBefore;
  return !i || !j.isSelectable(i) ? !1 : (e && e(n.tr.setSelection(j.create(n.doc, s.pos - i.nodeSize)).scrollIntoView()), !0);
};
function Hh(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function iv(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const av = (n, e, t) => {
  let r = iv(n, t);
  if (!r)
    return !1;
  let o = jh(r);
  if (!o)
    return !1;
  let s = o.nodeAfter;
  if (Uh(n, o, e))
    return !0;
  if (r.parent.content.size == 0 && (Vr(s, "start") || j.isSelectable(s))) {
    let i = gc(n.doc, r.before(), r.after(), R.empty);
    if (i && i.slice.size < i.to - i.from) {
      if (e) {
        let a = n.tr.step(i);
        a.setSelection(Vr(s, "start") ? X.findFrom(a.doc.resolve(a.mapping.map(o.pos)), 1) : j.create(a.doc, a.mapping.map(o.pos))), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && o.depth == r.depth - 1 ? (e && e(n.tr.delete(o.pos, o.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, lv = (n, e, t) => {
  let { $head: r, empty: o } = n.selection, s = r;
  if (!o)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    s = jh(r);
  }
  let i = s && s.nodeAfter;
  return !i || !j.isSelectable(i) ? !1 : (e && e(n.tr.setSelection(j.create(n.doc, s.pos)).scrollIntoView()), !0);
};
function jh(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const cv = (n, e) => {
  let t = n.selection, r = t instanceof j, o;
  if (r) {
    if (t.node.isTextblock || !En(n.doc, t.from))
      return !1;
    o = t.from;
  } else if (o = _i(n.doc, t.from, -1), o == null)
    return !1;
  if (e) {
    let s = n.tr.join(o);
    r && s.setSelection(j.create(s.doc, o - n.doc.resolve(o).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, uv = (n, e) => {
  let t = n.selection, r;
  if (t instanceof j) {
    if (t.node.isTextblock || !En(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = _i(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, dv = (n, e) => {
  let { $from: t, $to: r } = n.selection, o = t.blockRange(r), s = o && Xr(o);
  return s == null ? !1 : (e && e(n.tr.lift(o, s).scrollIntoView()), !0);
}, fv = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Vh(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const pv = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let o = t.node(-1), s = t.indexAfter(-1), i = Vh(o.contentMatchAt(s));
  if (!i || !o.canReplaceWith(s, s, i))
    return !1;
  if (e) {
    let a = t.after(), l = n.tr.replaceWith(a, a, i.createAndFill());
    l.setSelection(X.near(l.doc.resolve(a), 1)), e(l.scrollIntoView());
  }
  return !0;
}, hv = (n, e) => {
  let t = n.selection, { $from: r, $to: o } = t;
  if (t instanceof St || r.parent.inlineContent || o.parent.inlineContent)
    return !1;
  let s = Vh(o.parent.contentMatchAt(o.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let i = (!r.parentOffset && o.index() < o.parent.childCount ? r : o).pos, a = n.tr.insert(i, s.createAndFill());
    a.setSelection(G.create(a.doc, i + 1)), e(a.scrollIntoView());
  }
  return !0;
}, mv = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let s = t.before();
    if (Pr(n.doc, s))
      return e && e(n.tr.split(s).scrollIntoView()), !0;
  }
  let r = t.blockRange(), o = r && Xr(r);
  return o == null ? !1 : (e && e(n.tr.lift(r, o).scrollIntoView()), !0);
}, gv = (n, e) => {
  let { $from: t, to: r } = n.selection, o, s = t.sharedDepth(r);
  return s == 0 ? !1 : (o = t.before(s), e && e(n.tr.setSelection(j.create(n.doc, o))), !0);
};
function yv(n, e, t) {
  let r = e.nodeBefore, o = e.nodeAfter, s = e.index();
  return !r || !o || !r.type.compatibleContent(o.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(o.isTextblock || En(n.doc, e.pos)) ? !1 : (t && t(n.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0);
}
function Uh(n, e, t) {
  let r = e.nodeBefore, o = e.nodeAfter, s, i;
  if (r.type.spec.isolating || o.type.spec.isolating)
    return !1;
  if (yv(n, e, t))
    return !0;
  let a = e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (i = r.contentMatchAt(r.childCount)).findWrapping(o.type)) && i.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let d = e.pos + o.nodeSize, f = M.empty;
      for (let m = s.length - 1; m >= 0; m--)
        f = M.from(s[m].create(null, f));
      f = M.from(r.copy(f));
      let p = n.tr.step(new Oe(e.pos - 1, d, e.pos, d, new R(f, 1, 0), s.length, !0)), h = d + 2 * s.length;
      En(p.doc, h) && p.join(h), t(p.scrollIntoView());
    }
    return !0;
  }
  let l = X.findFrom(e, 1), c = l && l.$from.blockRange(l.$to), u = c && Xr(c);
  if (u != null && u >= e.depth)
    return t && t(n.tr.lift(c, u).scrollIntoView()), !0;
  if (a && Vr(o, "start", !0) && Vr(r, "end")) {
    let d = r, f = [];
    for (; f.push(d), !d.isTextblock; )
      d = d.lastChild;
    let p = o, h = 1;
    for (; !p.isTextblock; p = p.firstChild)
      h++;
    if (d.canReplace(d.childCount, d.childCount, p.content)) {
      if (t) {
        let m = M.empty;
        for (let b = f.length - 1; b >= 0; b--)
          m = M.from(f[b].copy(m));
        let g = n.tr.step(new Oe(e.pos - f.length, e.pos + o.nodeSize, e.pos + h, e.pos + o.nodeSize - h, new R(m, f.length, 0), 0, !0));
        t(g.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Wh(n) {
  return function(e, t) {
    let r = e.selection, o = n < 0 ? r.$from : r.$to, s = o.depth;
    for (; o.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return o.node(s).isTextblock ? (t && t(e.tr.setSelection(G.create(e.doc, n < 0 ? o.start(s) : o.end(s)))), !0) : !1;
  };
}
const bv = Wh(-1), vv = Wh(1);
function kv(n, e = null) {
  return function(t, r) {
    let { $from: o, $to: s } = t.selection, i = o.blockRange(s), a = i && mc(i, n, e);
    return a ? (r && r(t.tr.wrap(i, a).scrollIntoView()), !0) : !1;
  };
}
function xd(n, e = null) {
  return function(t, r) {
    let o = !1;
    for (let s = 0; s < t.selection.ranges.length && !o; s++) {
      let { $from: { pos: i }, $to: { pos: a } } = t.selection.ranges[s];
      t.doc.nodesBetween(i, a, (l, c) => {
        if (o)
          return !1;
        if (!(!l.isTextblock || l.hasMarkup(n, e)))
          if (l.type == n)
            o = !0;
          else {
            let u = t.doc.resolve(c), d = u.index();
            o = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!o)
      return !1;
    if (r) {
      let s = t.tr;
      for (let i = 0; i < t.selection.ranges.length; i++) {
        let { $from: { pos: a }, $to: { pos: l } } = t.selection.ranges[i];
        s.setBlockType(a, l, n, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function xv(n, e = null) {
  return function(t, r) {
    let { $from: o, $to: s } = t.selection, i = o.blockRange(s), a = !1, l = i;
    if (!i)
      return !1;
    if (i.depth >= 2 && o.node(i.depth - 1).type.compatibleContent(n) && i.startIndex == 0) {
      if (o.index(i.depth - 1) == 0)
        return !1;
      let u = t.doc.resolve(i.start - 2);
      l = new Hs(u, u, i.depth), i.endIndex < i.parent.childCount && (i = new Hs(o, t.doc.resolve(s.end(i.depth)), i.depth)), a = !0;
    }
    let c = mc(l, n, e, i);
    return c ? (r && r(wv(t.tr, i, c, a, n).scrollIntoView()), !0) : !1;
  };
}
function wv(n, e, t, r, o) {
  let s = M.empty;
  for (let u = t.length - 1; u >= 0; u--)
    s = M.from(t[u].type.create(t[u].attrs, s));
  n.step(new Oe(e.start - (r ? 2 : 0), e.end, e.start, e.end, new R(s, 0, 0), t.length, !0));
  let i = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == o && (i = u + 1);
  let a = t.length - i, l = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Pr(n.doc, l, a) && (n.split(l, a), l += 2 * a), l += c.child(u).nodeSize;
  return n;
}
function Sv(n) {
  return function(e, t) {
    let { $from: r, $to: o } = e.selection, s = r.blockRange(o, (i) => i.childCount > 0 && i.firstChild.type == n);
    return s ? t ? r.node(s.depth - 1).type == n ? Cv(e, t, n, s) : Ev(e, t, s) : !0 : !1;
  };
}
function Cv(n, e, t, r) {
  let o = n.tr, s = r.end, i = r.$to.end(r.depth);
  s < i && (o.step(new Oe(s - 1, i, s, i, new R(M.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Hs(o.doc.resolve(r.$from.pos), o.doc.resolve(i), r.depth));
  const a = Xr(r);
  if (a == null)
    return !1;
  o.lift(r, a);
  let l = o.mapping.map(s, -1) - 1;
  return En(o.doc, l) && o.join(l), e(o.scrollIntoView()), !0;
}
function Ev(n, e, t) {
  let r = n.tr, o = t.parent;
  for (let p = t.end, h = t.endIndex - 1, m = t.startIndex; h > m; h--)
    p -= o.child(h).nodeSize, r.delete(p - 1, p + 1);
  let s = r.doc.resolve(t.start), i = s.nodeAfter;
  if (r.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
    return !1;
  let a = t.startIndex == 0, l = t.endIndex == o.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (a ? 0 : 1), u + 1, i.content.append(l ? M.empty : M.from(o))))
    return !1;
  let d = s.pos, f = d + i.nodeSize;
  return r.step(new Oe(d - (a ? 1 : 0), f + (l ? 1 : 0), d + 1, f - 1, new R((a ? M.empty : M.from(o.copy(M.empty))).append(l ? M.empty : M.from(o.copy(M.empty))), a ? 0 : 1, l ? 0 : 1), a ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Av(n) {
  return function(e, t) {
    let { $from: r, $to: o } = e.selection, s = r.blockRange(o, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s)
      return !1;
    let i = s.startIndex;
    if (i == 0)
      return !1;
    let a = s.parent, l = a.child(i - 1);
    if (l.type != n)
      return !1;
    if (t) {
      let c = l.lastChild && l.lastChild.type == a.type, u = M.from(c ? n.create() : null), d = new R(M.from(n.create(null, M.from(a.type.create(null, u)))), c ? 3 : 1, 0), f = s.start, p = s.end;
      t(e.tr.step(new Oe(f - (c ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function Bi(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: o } = t, { storedMarks: s } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    filterTransaction: e.filterTransaction,
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return r;
    },
    get doc() {
      return o;
    },
    get tr() {
      return r = t.selection, o = t.doc, s = t.storedMarks, t;
    }
  };
}
class Fi {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: o } = t, { tr: s } = r, i = this.buildProps(s);
    return Object.fromEntries(Object.entries(e).map(([a, l]) => [a, (...u) => {
      const d = l(...u)(i);
      return !s.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(s), d;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: o, state: s } = this, { view: i } = o, a = [], l = !!e, c = e || s.tr, u = () => (!l && t && !c.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(c), a.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, p]) => [f, (...m) => {
        const g = this.buildProps(c, t), b = p(...m)(g);
        return a.push(b), d;
      }])),
      run: u
    };
    return d;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, o = !1, s = e || r.tr, i = this.buildProps(s, o);
    return {
      ...Object.fromEntries(Object.entries(t).map(([l, c]) => [l, (...u) => c(...u)({ ...i, dispatch: void 0 })])),
      chain: () => this.createChain(s, o)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: o, state: s } = this, { view: i } = o, a = {
      tr: e,
      editor: o,
      view: i,
      state: Bi({
        state: s,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([l, c]) => [l, (...u) => c(...u)(a)]));
      }
    };
    return a;
  }
}
class Tv {
  constructor() {
    this.callbacks = {};
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
  }
  emit(e, ...t) {
    const r = this.callbacks[e];
    return r && r.forEach((o) => o.apply(this, t)), this;
  }
  off(e, t) {
    const r = this.callbacks[e];
    return r && (t ? this.callbacks[e] = r.filter((o) => o !== t) : delete this.callbacks[e]), this;
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function P(n, e, t) {
  return n.config[e] === void 0 && n.parent ? P(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? P(n.parent, e, t) : null
  }) : n.config[e];
}
function qi(n) {
  const e = n.filter((o) => o.type === "extension"), t = n.filter((o) => o.type === "node"), r = n.filter((o) => o.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function Kh(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = qi(n), o = [...t, ...r], s = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((i) => {
    const a = {
      name: i.name,
      options: i.options,
      storage: i.storage
    }, l = P(i, "addGlobalAttributes", a);
    if (!l)
      return;
    l().forEach((u) => {
      u.types.forEach((d) => {
        Object.entries(u.attributes).forEach(([f, p]) => {
          e.push({
            type: d,
            name: f,
            attribute: {
              ...s,
              ...p
            }
          });
        });
      });
    });
  }), o.forEach((i) => {
    const a = {
      name: i.name,
      options: i.options,
      storage: i.storage
    }, l = P(i, "addAttributes", a);
    if (!l)
      return;
    const c = l();
    Object.entries(c).forEach(([u, d]) => {
      const f = {
        ...s,
        ...d
      };
      typeof (f == null ? void 0 : f.default) == "function" && (f.default = f.default()), f != null && f.isRequired && (f == null ? void 0 : f.default) === void 0 && delete f.default, e.push({
        type: i.name,
        name: u,
        attribute: f
      });
    });
  }), e;
}
function De(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
function de(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([o, s]) => {
      if (!r[o]) {
        r[o] = s;
        return;
      }
      if (o === "class") {
        const a = s ? s.split(" ") : [], l = r[o] ? r[o].split(" ") : [], c = a.filter((u) => !l.includes(u));
        r[o] = [...l, ...c].join(" ");
      } else
        o === "style" ? r[o] = [r[o], s].join("; ") : r[o] = s;
    }), r;
  }, {});
}
function Tl(n, e) {
  return e.filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => de(t, r), {});
}
function Jh(n) {
  return typeof n == "function";
}
function Y(n, e = void 0, ...t) {
  return Jh(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Ov(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function Mv(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function wd(n, e) {
  return n.style ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const o = e.reduce((s, i) => {
        const a = i.attribute.parseHTML ? i.attribute.parseHTML(t) : Mv(t.getAttribute(i.name));
        return a == null ? s : {
          ...s,
          [i.name]: a
        };
      }, {});
      return { ...r, ...o };
    }
  };
}
function Sd(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && Ov(t) ? !1 : t != null)
  );
}
function Dv(n, e) {
  var t;
  const r = Kh(n), { nodeExtensions: o, markExtensions: s } = qi(n), i = (t = o.find((c) => P(c, "topNode"))) === null || t === void 0 ? void 0 : t.name, a = Object.fromEntries(o.map((c) => {
    const u = r.filter((b) => b.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((b, v) => {
      const x = P(v, "extendNodeSchema", d);
      return {
        ...b,
        ...x ? x(c) : {}
      };
    }, {}), p = Sd({
      ...f,
      content: Y(P(c, "content", d)),
      marks: Y(P(c, "marks", d)),
      group: Y(P(c, "group", d)),
      inline: Y(P(c, "inline", d)),
      atom: Y(P(c, "atom", d)),
      selectable: Y(P(c, "selectable", d)),
      draggable: Y(P(c, "draggable", d)),
      code: Y(P(c, "code", d)),
      defining: Y(P(c, "defining", d)),
      isolating: Y(P(c, "isolating", d)),
      attrs: Object.fromEntries(u.map((b) => {
        var v;
        return [b.name, { default: (v = b == null ? void 0 : b.attribute) === null || v === void 0 ? void 0 : v.default }];
      }))
    }), h = Y(P(c, "parseHTML", d));
    h && (p.parseDOM = h.map((b) => wd(b, u)));
    const m = P(c, "renderHTML", d);
    m && (p.toDOM = (b) => m({
      node: b,
      HTMLAttributes: Tl(b, u)
    }));
    const g = P(c, "renderText", d);
    return g && (p.toText = g), [c.name, p];
  })), l = Object.fromEntries(s.map((c) => {
    const u = r.filter((g) => g.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((g, b) => {
      const v = P(b, "extendMarkSchema", d);
      return {
        ...g,
        ...v ? v(c) : {}
      };
    }, {}), p = Sd({
      ...f,
      inclusive: Y(P(c, "inclusive", d)),
      excludes: Y(P(c, "excludes", d)),
      group: Y(P(c, "group", d)),
      spanning: Y(P(c, "spanning", d)),
      code: Y(P(c, "code", d)),
      attrs: Object.fromEntries(u.map((g) => {
        var b;
        return [g.name, { default: (b = g == null ? void 0 : g.attribute) === null || b === void 0 ? void 0 : b.default }];
      }))
    }), h = Y(P(c, "parseHTML", d));
    h && (p.parseDOM = h.map((g) => wd(g, u)));
    const m = P(c, "renderHTML", d);
    return m && (p.toDOM = (g) => m({
      mark: g,
      HTMLAttributes: Tl(g, u)
    })), [c.name, p];
  }));
  return new Wp({
    topNode: i,
    nodes: a,
    marks: l
  });
}
function Aa(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function Cd(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
const _v = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (o, s, i, a) => {
    var l, c;
    const u = ((c = (l = o.type.spec).toText) === null || c === void 0 ? void 0 : c.call(l, {
      node: o,
      pos: s,
      parent: i,
      index: a
    })) || o.textContent || "%leaf%";
    t += u.slice(0, Math.max(0, r - s));
  }), t;
};
function Oc(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
class Jo {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Nv = (n, e) => {
  if (Oc(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function Ta(n) {
  var e;
  const { editor: t, from: r, to: o, text: s, rules: i, plugin: a } = n, { view: l } = t;
  if (l.composing)
    return !1;
  const c = l.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = _v(c) + s;
  return i.forEach((f) => {
    if (u)
      return;
    const p = Nv(d, f.find);
    if (!p)
      return;
    const h = l.state.tr, m = Bi({
      state: l.state,
      transaction: h
    }), g = {
      from: r - (p[0].length - s.length),
      to: o
    }, { commands: b, chain: v, can: x } = new Fi({
      editor: t,
      state: m
    });
    f.handler({
      state: m,
      range: g,
      match: p,
      commands: b,
      chain: v,
      can: x
    }) === null || !h.steps.length || (h.setMeta(a, {
      transform: h,
      from: r,
      to: o,
      text: s
    }), l.dispatch(h), u = !0);
  }), u;
}
function Rv(n) {
  const { editor: e, rules: t } = n, r = new be({
    state: {
      init() {
        return null;
      },
      apply(o, s) {
        const i = o.getMeta(r);
        return i || (o.selectionSet || o.docChanged ? null : s);
      }
    },
    props: {
      handleTextInput(o, s, i, a) {
        return Ta({
          editor: e,
          from: s,
          to: i,
          text: a,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (o) => (setTimeout(() => {
          const { $cursor: s } = o.state.selection;
          s && Ta({
            editor: e,
            from: s.pos,
            to: s.pos,
            text: "",
            rules: t,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(o, s) {
        if (s.key !== "Enter")
          return !1;
        const { $cursor: i } = o.state.selection;
        return i ? Ta({
          editor: e,
          from: i.pos,
          to: i.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function Lv(n) {
  return typeof n == "number";
}
class Pv {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Iv = (n, e) => {
  if (Oc(e))
    return [...n.matchAll(e)];
  const t = e(n);
  return t ? t.map((r) => {
    const o = [r.text];
    return o.index = r.index, o.input = n, o.data = r.data, r.replaceWith && (r.text.includes(r.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), o.push(r.replaceWith)), o;
  }) : [];
};
function Bv(n) {
  const { editor: e, state: t, from: r, to: o, rule: s, pasteEvent: i, dropEvent: a } = n, { commands: l, chain: c, can: u } = new Fi({
    editor: e,
    state: t
  }), d = [];
  return t.doc.nodesBetween(r, o, (p, h) => {
    if (!p.isTextblock || p.type.spec.code)
      return;
    const m = Math.max(r, h), g = Math.min(o, h + p.content.size), b = p.textBetween(m - h, g - h, void 0, "￼");
    Iv(b, s.find).forEach((x) => {
      if (x.index === void 0)
        return;
      const y = m + x.index + 1, w = y + x[0].length, k = {
        from: t.tr.mapping.map(y),
        to: t.tr.mapping.map(w)
      }, S = s.handler({
        state: t,
        range: k,
        match: x,
        commands: l,
        chain: c,
        can: u,
        pasteEvent: i,
        dropEvent: a
      });
      d.push(S);
    });
  }), d.every((p) => p !== null);
}
function Fv(n) {
  const { editor: e, rules: t } = n;
  let r = null, o = !1, s = !1, i = new ClipboardEvent("paste"), a = new DragEvent("drop");
  return t.map((c) => new be({
    // we register a global drag handler to track the current drag source element
    view(u) {
      const d = (f) => {
        var p;
        r = !((p = u.dom.parentElement) === null || p === void 0) && p.contains(f.target) ? u.dom.parentElement : null;
      };
      return window.addEventListener("dragstart", d), {
        destroy() {
          window.removeEventListener("dragstart", d);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (u, d) => (s = r === u.dom.parentElement, a = d, !1),
        paste: (u, d) => {
          var f;
          const p = (f = d.clipboardData) === null || f === void 0 ? void 0 : f.getData("text/html");
          return i = d, o = !!(p != null && p.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (u, d, f) => {
      const p = u[0], h = p.getMeta("uiEvent") === "paste" && !o, m = p.getMeta("uiEvent") === "drop" && !s;
      if (!h && !m)
        return;
      const g = d.doc.content.findDiffStart(f.doc.content), b = d.doc.content.findDiffEnd(f.doc.content);
      if (!Lv(g) || !b || g === b.b)
        return;
      const v = f.tr, x = Bi({
        state: f,
        transaction: v
      });
      if (!(!Bv({
        editor: e,
        state: x,
        from: Math.max(g - 1, 0),
        to: b.b - 1,
        rule: c,
        pasteEvent: i,
        dropEvent: a
      }) || !v.steps.length))
        return a = new DragEvent("drop"), i = new ClipboardEvent("paste"), v;
    }
  }));
}
function qv(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return [...new Set(e)];
}
class Mr {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = Mr.resolve(e), this.schema = Dv(this.extensions, t), this.extensions.forEach((r) => {
      var o;
      this.editor.extensionStorage[r.name] = r.storage;
      const s = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: this.editor,
        type: Aa(r.name, this.schema)
      };
      r.type === "mark" && (!((o = Y(P(r, "keepOnSplit", s))) !== null && o !== void 0) || o) && this.splittableMarks.push(r.name);
      const i = P(r, "onBeforeCreate", s);
      i && this.editor.on("beforeCreate", i);
      const a = P(r, "onCreate", s);
      a && this.editor.on("create", a);
      const l = P(r, "onUpdate", s);
      l && this.editor.on("update", l);
      const c = P(r, "onSelectionUpdate", s);
      c && this.editor.on("selectionUpdate", c);
      const u = P(r, "onTransaction", s);
      u && this.editor.on("transaction", u);
      const d = P(r, "onFocus", s);
      d && this.editor.on("focus", d);
      const f = P(r, "onBlur", s);
      f && this.editor.on("blur", f);
      const p = P(r, "onDestroy", s);
      p && this.editor.on("destroy", p);
    });
  }
  static resolve(e) {
    const t = Mr.sort(Mr.flatten(e)), r = qv(t.map((o) => o.name));
    return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((o) => `'${o}'`).join(", ")}]. This can lead to issues.`), t;
  }
  static flatten(e) {
    return e.map((t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage
      }, o = P(t, "addExtensions", r);
      return o ? [t, ...this.flatten(o())] : t;
    }).flat(10);
  }
  static sort(e) {
    return e.sort((r, o) => {
      const s = P(r, "priority") || 100, i = P(o, "priority") || 100;
      return s > i ? -1 : s < i ? 1 : 0;
    });
  }
  get commands() {
    return this.extensions.reduce((e, t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: Aa(t.name, this.schema)
      }, o = P(t, "addCommands", r);
      return o ? {
        ...e,
        ...o()
      } : e;
    }, {});
  }
  get plugins() {
    const { editor: e } = this, t = Mr.sort([...this.extensions].reverse()), r = [], o = [], s = t.map((i) => {
      const a = {
        name: i.name,
        options: i.options,
        storage: i.storage,
        editor: e,
        type: Aa(i.name, this.schema)
      }, l = [], c = P(i, "addKeyboardShortcuts", a);
      let u = {};
      if (i.type === "mark" && i.config.exitable && (u.ArrowRight = () => ke.handleExit({ editor: e, mark: i })), c) {
        const m = Object.fromEntries(Object.entries(c()).map(([g, b]) => [g, () => b({ editor: e })]));
        u = { ...u, ...m };
      }
      const d = tv(u);
      l.push(d);
      const f = P(i, "addInputRules", a);
      Cd(i, e.options.enableInputRules) && f && r.push(...f());
      const p = P(i, "addPasteRules", a);
      Cd(i, e.options.enablePasteRules) && p && o.push(...p());
      const h = P(i, "addProseMirrorPlugins", a);
      if (h) {
        const m = h();
        l.push(...m);
      }
      return l;
    }).flat();
    return [
      Rv({
        editor: e,
        rules: r
      }),
      ...Fv({
        editor: e,
        rules: o
      }),
      ...s
    ];
  }
  get attributes() {
    return Kh(this.extensions);
  }
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = qi(this.extensions);
    return Object.fromEntries(t.filter((r) => !!P(r, "addNodeView")).map((r) => {
      const o = this.attributes.filter((l) => l.type === r.name), s = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: e,
        type: De(r.name, this.schema)
      }, i = P(r, "addNodeView", s);
      if (!i)
        return [];
      const a = (l, c, u, d) => {
        const f = Tl(l, o);
        return i()({
          editor: e,
          node: l,
          getPos: u,
          decorations: d,
          HTMLAttributes: f,
          extension: r
        });
      };
      return [r.name, a];
    }));
  }
}
function zv(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Oa(n) {
  return zv(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function zi(n, e) {
  const t = { ...n };
  return Oa(n) && Oa(e) && Object.keys(e).forEach((r) => {
    Oa(e[r]) ? r in n ? t[r] = zi(n[r], e[r]) : Object.assign(t, { [r]: e[r] }) : Object.assign(t, { [r]: e[r] });
  }), t;
}
class ye {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = Y(P(this, "addOptions", {
      name: this.name
    }))), this.storage = Y(P(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ye(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = zi(this.options, e), t.storage = Y(P(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new ye(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = Y(P(t, "addOptions", {
      name: t.name
    })), t.storage = Y(P(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Gh(n, e, t) {
  const { from: r, to: o } = e, { blockSeparator: s = `

`, textSerializers: i = {} } = t || {};
  let a = "", l = !0;
  return n.nodesBetween(r, o, (c, u, d, f) => {
    var p;
    const h = i == null ? void 0 : i[c.type.name];
    h ? (c.isBlock && !l && (a += s, l = !0), d && (a += h({
      node: c,
      pos: u,
      parent: d,
      index: f,
      range: e
    }))) : c.isText ? (a += (p = c == null ? void 0 : c.text) === null || p === void 0 ? void 0 : p.slice(Math.max(r, u) - u, o - u), l = !1) : c.isBlock && !l && (a += s, l = !0);
  }), a;
}
function Zh(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const $v = ye.create({
  name: "clipboardTextSerializer",
  addProseMirrorPlugins() {
    return [
      new be({
        key: new Pe("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: o } = e, { ranges: s } = o, i = Math.min(...s.map((u) => u.$from.pos)), a = Math.max(...s.map((u) => u.$to.pos)), l = Zh(t);
            return Gh(r, { from: i, to: a }, {
              textSerializers: l
            });
          }
        }
      })
    ];
  }
}), Hv = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), jv = (n = !1) => ({ commands: e }) => e.setContent("", n), Vv = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: o } = r;
  return t && o.forEach(({ $from: s, $to: i }) => {
    n.doc.nodesBetween(s.pos, i.pos, (a, l) => {
      if (a.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(l)), f = c.resolve(u.map(l + a.nodeSize)), p = d.blockRange(f);
      if (!p)
        return;
      const h = Xr(p);
      if (a.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, m);
      }
      (h || h === 0) && e.lift(p, h);
    });
  }), !0;
}, Uv = (n) => (e) => n(e), Wv = () => ({ state: n, dispatch: e }) => hv(n, e), Kv = (n, e) => ({ editor: t, tr: r }) => {
  const { state: o } = t, s = o.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const i = r.mapping.map(e);
  return r.insert(i, s.content), r.setSelection(new G(r.doc.resolve(i - 1))), !0;
}, Jv = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const o = n.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1)
    if (o.node(s).type === r.type) {
      if (e) {
        const a = o.before(s), l = o.after(s);
        n.delete(a, l).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Gv = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const o = De(n, t.schema), s = e.selection.$anchor;
  for (let i = s.depth; i > 0; i -= 1)
    if (s.node(i).type === o) {
      if (r) {
        const l = s.before(i), c = s.after(i);
        e.delete(l, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Zv = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: o } = n;
  return t && e.delete(r, o), !0;
}, Yv = () => ({ state: n, dispatch: e }) => nv(n, e), Xv = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Qv = () => ({ state: n, dispatch: e }) => pv(n, e);
function Zs(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((o) => t.strict ? e[o] === n[o] : Oc(e[o]) ? e[o].test(n[o]) : e[o] === n[o]) : !0;
}
function Ol(n, e, t = {}) {
  return n.find((r) => r.type === e && Zs(r.attrs, t));
}
function ek(n, e, t = {}) {
  return !!Ol(n, e, t);
}
function Mc(n, e, t = {}) {
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if (n.parentOffset === r.offset && r.offset !== 0 && (r = n.parent.childBefore(n.parentOffset)), !r.node)
    return;
  const o = Ol([...r.node.marks], e, t);
  if (!o)
    return;
  let s = r.index, i = n.start() + r.offset, a = s + 1, l = i + r.node.nodeSize;
  for (Ol([...r.node.marks], e, t); s > 0 && o.isInSet(n.parent.child(s - 1).marks); )
    s -= 1, i -= n.parent.child(s).nodeSize;
  for (; a < n.parent.childCount && ek([...n.parent.child(a).marks], e, t); )
    l += n.parent.child(a).nodeSize, a += 1;
  return {
    from: i,
    to: l
  };
}
function Tn(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const tk = (n, e = {}) => ({ tr: t, state: r, dispatch: o }) => {
  const s = Tn(n, r.schema), { doc: i, selection: a } = t, { $from: l, from: c, to: u } = a;
  if (o) {
    const d = Mc(l, s, e);
    if (d && d.from <= c && d.to >= u) {
      const f = G.create(i, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, nk = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function Dc(n) {
  return n instanceof G;
}
function Yt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Yh(n, e = null) {
  if (!e)
    return null;
  const t = X.atStart(n), r = X.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const o = t.from, s = r.to;
  return e === "all" ? G.create(n, Yt(0, o, s), Yt(n.content.size, o, s)) : G.create(n, Yt(e, o, s), Yt(e, o, s));
}
function _c() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const rk = (n = null, e = {}) => ({ editor: t, view: r, tr: o, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const i = () => {
    _c() && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (s && n === null && !Dc(t.state.selection))
    return i(), !0;
  const a = Yh(o.doc, n) || t.state.selection, l = t.state.selection.eq(a);
  return s && (l || o.setSelection(a), l && o.storedMarks && o.setStoredMarks(o.storedMarks), i()), !0;
}, ok = (n, e) => (t) => n.every((r, o) => e(r, { ...t, index: o })), sk = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e);
function Ed(n) {
  const e = `<body>${n}</body>`;
  return new window.DOMParser().parseFromString(e, "text/html").body;
}
function Ys(n, e, t) {
  if (t = {
    slice: !0,
    parseOptions: {},
    ...t
  }, typeof n == "object" && n !== null)
    try {
      return Array.isArray(n) && n.length > 0 ? M.fromArray(n.map((r) => e.nodeFromJSON(r))) : e.nodeFromJSON(n);
    } catch (r) {
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", r), Ys("", e, t);
    }
  if (typeof n == "string") {
    const r = rr.fromSchema(e);
    return t.slice ? r.parseSlice(Ed(n), t.parseOptions).content : r.parse(Ed(n), t.parseOptions);
  }
  return Ys("", e, t);
}
function ik(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const o = n.steps[r];
  if (!(o instanceof Re || o instanceof Oe))
    return;
  const s = n.mapping.maps[r];
  let i = 0;
  s.forEach((a, l, c, u) => {
    i === 0 && (i = u);
  }), n.setSelection(X.near(n.doc.resolve(i), t));
}
const ak = (n) => n.toString().startsWith("<"), lk = (n, e, t) => ({ tr: r, dispatch: o, editor: s }) => {
  if (o) {
    t = {
      parseOptions: {},
      updateSelection: !0,
      ...t
    };
    const i = Ys(e, s.schema, {
      parseOptions: {
        preserveWhitespace: "full",
        ...t.parseOptions
      }
    });
    if (i.toString() === "<>")
      return !0;
    let { from: a, to: l } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, c = !0, u = !0;
    if ((ak(i) ? i : [i]).forEach((f) => {
      f.check(), c = c ? f.isText && f.marks.length === 0 : !1, u = u ? f.isBlock : !1;
    }), a === l && u) {
      const { parent: f } = r.doc.resolve(a);
      f.isTextblock && !f.type.spec.code && !f.childCount && (a -= 1, l += 1);
    }
    c ? Array.isArray(e) ? r.insertText(e.map((f) => f.text || "").join(""), a, l) : typeof e == "object" && e && e.text ? r.insertText(e.text, a, l) : r.insertText(e, a, l) : r.replaceWith(a, l, i), t.updateSelection && ik(r, r.steps.length - 1, -1);
  }
  return !0;
}, ck = () => ({ state: n, dispatch: e }) => cv(n, e), uk = () => ({ state: n, dispatch: e }) => uv(n, e), dk = () => ({ state: n, dispatch: e }) => ov(n, e), fk = () => ({ state: n, dispatch: e }) => av(n, e), pk = () => ({ tr: n, state: e, dispatch: t }) => {
  try {
    const r = _i(e.doc, e.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
  } catch {
    return !1;
  }
}, hk = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = _i(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
};
function Nc() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function mk(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, o, s, i;
  for (let a = 0; a < e.length - 1; a += 1) {
    const l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      i = !0;
    else if (/^a(lt)?$/i.test(l))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      o = !0;
    else if (/^s(hift)?$/i.test(l))
      s = !0;
    else if (/^mod$/i.test(l))
      _c() || Nc() ? i = !0 : o = !0;
    else
      throw new Error(`Unrecognized modifier name: ${l}`);
  }
  return r && (t = `Alt-${t}`), o && (t = `Ctrl-${t}`), i && (t = `Meta-${t}`), s && (t = `Shift-${t}`), t;
}
const gk = (n) => ({ editor: e, view: t, tr: r, dispatch: o }) => {
  const s = mk(n).split(/-(?!$)/), i = s.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), a = new KeyboardEvent("keydown", {
    key: i === "Space" ? " " : i,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), l = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, a));
  });
  return l == null || l.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && o && r.maybeStep(u);
  }), !0;
};
function Po(n, e, t = {}) {
  const { from: r, to: o, empty: s } = n.selection, i = e ? De(e, n.schema) : null, a = [];
  n.doc.nodesBetween(r, o, (d, f) => {
    if (d.isText)
      return;
    const p = Math.max(r, f), h = Math.min(o, f + d.nodeSize);
    a.push({
      node: d,
      from: p,
      to: h
    });
  });
  const l = o - r, c = a.filter((d) => i ? i.name === d.node.type.name : !0).filter((d) => Zs(d.node.attrs, t, { strict: !1 }));
  return s ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= l;
}
const yk = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const o = De(n, t.schema);
  return Po(t, o, e) ? dv(t, r) : !1;
}, bk = () => ({ state: n, dispatch: e }) => mv(n, e), vk = (n) => ({ state: e, dispatch: t }) => {
  const r = De(n, e.schema);
  return Sv(r)(e, t);
}, kk = () => ({ state: n, dispatch: e }) => fv(n, e);
function $i(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Ad(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, o) => (t.includes(o) || (r[o] = n[o]), r), {});
}
const xk = (n, e) => ({ tr: t, state: r, dispatch: o }) => {
  let s = null, i = null;
  const a = $i(typeof n == "string" ? n : n.name, r.schema);
  return a ? (a === "node" && (s = De(n, r.schema)), a === "mark" && (i = Tn(n, r.schema)), o && t.selection.ranges.forEach((l) => {
    r.doc.nodesBetween(l.$from.pos, l.$to.pos, (c, u) => {
      s && s === c.type && t.setNodeMarkup(u, void 0, Ad(c.attrs, e)), i && c.marks.length && c.marks.forEach((d) => {
        i === d.type && t.addMark(u, u + c.nodeSize, i.create(Ad(d.attrs, e)));
      });
    });
  }), !0) : !1;
}, wk = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Sk = () => ({ tr: n, commands: e }) => e.setTextSelection({
  from: 0,
  to: n.doc.content.size
}), Ck = () => ({ state: n, dispatch: e }) => sv(n, e), Ek = () => ({ state: n, dispatch: e }) => lv(n, e), Ak = () => ({ state: n, dispatch: e }) => gv(n, e), Tk = () => ({ state: n, dispatch: e }) => vv(n, e), Ok = () => ({ state: n, dispatch: e }) => bv(n, e);
function Xh(n, e, t = {}) {
  return Ys(n, e, { slice: !1, parseOptions: t });
}
const Mk = (n, e = !1, t = {}) => ({ tr: r, editor: o, dispatch: s }) => {
  const { doc: i } = r, a = Xh(n, o.schema, t);
  return s && r.replaceWith(0, i.content.size, a).setMeta("preventUpdate", !e), !0;
};
function Go(n, e) {
  const t = Tn(e, n.schema), { from: r, to: o, empty: s } = n.selection, i = [];
  s ? (n.storedMarks && i.push(...n.storedMarks), i.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, o, (l) => {
    i.push(...l.marks);
  });
  const a = i.find((l) => l.type.name === t.name);
  return a ? { ...a.attrs } : {};
}
function Dk(n, e) {
  const t = new ih(n);
  return e.forEach((r) => {
    r.steps.forEach((o) => {
      t.step(o);
    });
  }), t;
}
function _k(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function Nk(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (o, s) => {
    t(o) && r.push({
      node: o,
      pos: s
    });
  }), r;
}
function Rk(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function Rc(n) {
  return (e) => Rk(e.$from, n);
}
function Lc(n, e) {
  const t = Pt.fromSchema(e).serializeFragment(n), o = document.implementation.createHTMLDocument().createElement("div");
  return o.appendChild(t), o.innerHTML;
}
function Lk(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return Gh(n, t, e);
}
function Pk(n, e) {
  const t = De(e, n.schema), { from: r, to: o } = n.selection, s = [];
  n.doc.nodesBetween(r, o, (a) => {
    s.push(a);
  });
  const i = s.reverse().find((a) => a.type.name === t.name);
  return i ? { ...i.attrs } : {};
}
function Qh(n, e) {
  const t = $i(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? Pk(n, e) : t === "mark" ? Go(n, e) : {};
}
function Ik(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const o = e(r);
    return Object.prototype.hasOwnProperty.call(t, o) ? !1 : t[o] = !0;
  });
}
function Bk(n) {
  const e = Ik(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((s, i) => i !== r).some((s) => t.oldRange.from >= s.oldRange.from && t.oldRange.to <= s.oldRange.to && t.newRange.from >= s.newRange.from && t.newRange.to <= s.newRange.to));
}
function Fk(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((o, s) => {
    const i = [];
    if (o.ranges.length)
      o.forEach((a, l) => {
        i.push({ from: a, to: l });
      });
    else {
      const { from: a, to: l } = t[s];
      if (a === void 0 || l === void 0)
        return;
      i.push({ from: a, to: l });
    }
    i.forEach(({ from: a, to: l }) => {
      const c = e.slice(s).map(a, -1), u = e.slice(s).map(l), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), Bk(r);
}
function Pc(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((o) => {
    const s = t.resolve(n - 1), i = Mc(s, o.type);
    i && r.push({
      mark: o,
      ...i
    });
  }) : t.nodesBetween(n, e, (o, s) => {
    r.push(...o.marks.map((i) => ({
      from: s,
      to: s + o.nodeSize,
      mark: i
    })));
  }), r;
}
function _s(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const o = n.find((s) => s.type === e && s.name === r);
    return o ? o.attribute.keepOnSplit : !1;
  }));
}
function Ml(n, e, t = {}) {
  const { empty: r, ranges: o } = n.selection, s = e ? Tn(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => s ? s.name === d.type.name : !0).find((d) => Zs(d.attrs, t, { strict: !1 }));
  let i = 0;
  const a = [];
  if (o.forEach(({ $from: d, $to: f }) => {
    const p = d.pos, h = f.pos;
    n.doc.nodesBetween(p, h, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const b = Math.max(p, g), v = Math.min(h, g + m.nodeSize), x = v - b;
      i += x, a.push(...m.marks.map((y) => ({
        mark: y,
        from: b,
        to: v
      })));
    });
  }), i === 0)
    return !1;
  const l = a.filter((d) => s ? s.name === d.mark.type.name : !0).filter((d) => Zs(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = a.filter((d) => s ? d.mark.type !== s && d.mark.type.excludes(s) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (l > 0 ? l + c : l) >= i;
}
function qk(n, e, t = {}) {
  if (!e)
    return Po(n, null, t) || Ml(n, null, t);
  const r = $i(e, n.schema);
  return r === "node" ? Po(n, e, t) : r === "mark" ? Ml(n, e, t) : !1;
}
function Td(n, e) {
  const { nodeExtensions: t } = qi(e), r = t.find((i) => i.name === n);
  if (!r)
    return !1;
  const o = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, s = Y(P(r, "group", o));
  return typeof s != "string" ? !1 : s.split(" ").includes("list");
}
function zk(n) {
  var e;
  const t = (e = n.type.createAndFill()) === null || e === void 0 ? void 0 : e.toJSON(), r = n.toJSON();
  return JSON.stringify(t) === JSON.stringify(r);
}
function $k(n) {
  return n instanceof j;
}
function em(n, e, t) {
  const o = n.state.doc.content.size, s = Yt(e, 0, o), i = Yt(t, 0, o), a = n.coordsAtPos(s), l = n.coordsAtPos(i, -1), c = Math.min(a.top, l.top), u = Math.max(a.bottom, l.bottom), d = Math.min(a.left, l.left), f = Math.max(a.right, l.right), p = f - d, h = u - c, b = {
    top: c,
    bottom: u,
    left: d,
    right: f,
    width: p,
    height: h,
    x: d,
    y: c
  };
  return {
    ...b,
    toJSON: () => b
  };
}
function Hk(n, e, t) {
  var r;
  const { selection: o } = e;
  let s = null;
  if (Dc(o) && (s = o.$cursor), s) {
    const a = (r = n.storedMarks) !== null && r !== void 0 ? r : s.marks();
    return !!t.isInSet(a) || !a.some((l) => l.type.excludes(t));
  }
  const { ranges: i } = o;
  return i.some(({ $from: a, $to: l }) => {
    let c = a.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(a.pos, l.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const p = !f || f.type.allowsMarkType(t), h = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = p && h;
      }
      return !c;
    }), c;
  });
}
const jk = (n, e = {}) => ({ tr: t, state: r, dispatch: o }) => {
  const { selection: s } = t, { empty: i, ranges: a } = s, l = Tn(n, r.schema);
  if (o)
    if (i) {
      const c = Go(r, l);
      t.addStoredMark(l.create({
        ...c,
        ...e
      }));
    } else
      a.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, p) => {
          const h = Math.max(p, u), m = Math.min(p + f.nodeSize, d);
          f.marks.find((b) => b.type === l) ? f.marks.forEach((b) => {
            l === b.type && t.addMark(h, m, l.create({
              ...b.attrs,
              ...e
            }));
          }) : t.addMark(h, m, l.create(e));
        });
      });
  return Hk(r, t, l);
}, Vk = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Uk = (n, e = {}) => ({ state: t, dispatch: r, chain: o }) => {
  const s = De(n, t.schema);
  return s.isTextblock ? o().command(({ commands: i }) => xd(s, e)(t) ? !0 : i.clearNodes()).command(({ state: i }) => xd(s, e)(i, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Wk = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, o = Yt(n, 0, r.content.size), s = j.create(r, o);
    e.setSelection(s);
  }
  return !0;
}, Kk = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: o, to: s } = typeof n == "number" ? { from: n, to: n } : n, i = G.atStart(r).from, a = G.atEnd(r).to, l = Yt(o, i, a), c = Yt(s, i, a), u = G.create(r, l, c);
    e.setSelection(u);
  }
  return !0;
}, Jk = (n) => ({ state: e, dispatch: t }) => {
  const r = De(n, e.schema);
  return Av(r)(e, t);
};
function Od(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((o) => e == null ? void 0 : e.includes(o.type.name));
    n.tr.ensureMarks(r);
  }
}
const Gk = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: o }) => {
  const { selection: s, doc: i } = e, { $from: a, $to: l } = s, c = o.extensionManager.attributes, u = _s(c, a.node().type.name, a.node().attrs);
  if (s instanceof j && s.node.isBlock)
    return !a.parentOffset || !Pr(i, a.pos) ? !1 : (r && (n && Od(t, o.extensionManager.splittableMarks), e.split(a.pos).scrollIntoView()), !0);
  if (!a.parent.isBlock)
    return !1;
  if (r) {
    const d = l.parentOffset === l.parent.content.size;
    s instanceof G && e.deleteSelection();
    const f = a.depth === 0 ? void 0 : _k(a.node(-1).contentMatchAt(a.indexAfter(-1)));
    let p = d && f ? [
      {
        type: f,
        attrs: u
      }
    ] : void 0, h = Pr(e.doc, e.mapping.map(a.pos), 1, p);
    if (!p && !h && Pr(e.doc, e.mapping.map(a.pos), 1, f ? [{ type: f }] : void 0) && (h = !0, p = f ? [
      {
        type: f,
        attrs: u
      }
    ] : void 0), h && (e.split(e.mapping.map(a.pos), 1, p), f && !d && !a.parentOffset && a.parent.type !== f)) {
      const m = e.mapping.map(a.before()), g = e.doc.resolve(m);
      a.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(a.before()), f);
    }
    n && Od(t, o.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return !0;
}, Zk = (n) => ({ tr: e, state: t, dispatch: r, editor: o }) => {
  var s;
  const i = De(n, t.schema), { $from: a, $to: l } = t.selection, c = t.selection.node;
  if (c && c.isBlock || a.depth < 2 || !a.sameParent(l))
    return !1;
  const u = a.node(-1);
  if (u.type !== i)
    return !1;
  const d = o.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== i || a.index(-2) !== a.node(-2).childCount - 1)
      return !1;
    if (r) {
      let g = M.empty;
      const b = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let S = a.depth - b; S >= a.depth - 3; S -= 1)
        g = M.from(a.node(S).copy(g));
      const v = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, x = _s(d, a.node().type.name, a.node().attrs), y = ((s = i.contentMatch.defaultType) === null || s === void 0 ? void 0 : s.createAndFill(x)) || void 0;
      g = g.append(M.from(i.createAndFill(null, y) || void 0));
      const w = a.before(a.depth - (b - 1));
      e.replace(w, a.after(-v), new R(g, 4 - b, 0));
      let k = -1;
      e.doc.nodesBetween(w, e.doc.content.size, (S, E) => {
        if (k > -1)
          return !1;
        S.isTextblock && S.content.size === 0 && (k = E + 1);
      }), k > -1 && e.setSelection(G.near(e.doc.resolve(k))), e.scrollIntoView();
    }
    return !0;
  }
  const f = l.pos === a.end() ? u.contentMatchAt(0).defaultType : null, p = _s(d, u.type.name, u.attrs), h = _s(d, a.node().type.name, a.node().attrs);
  e.delete(a.pos, l.pos);
  const m = f ? [
    { type: i, attrs: p },
    { type: f, attrs: h }
  ] : [{ type: i, attrs: p }];
  if (!Pr(e.doc, a.pos, 2))
    return !1;
  if (r) {
    const { selection: g, storedMarks: b } = t, { splittableMarks: v } = o.extensionManager, x = b || g.$to.parentOffset && g.$from.marks();
    if (e.split(a.pos, 2, m).scrollIntoView(), !x || !r)
      return !0;
    const y = x.filter((w) => v.includes(w.type.name));
    e.ensureMarks(y);
  }
  return !0;
}, Ma = (n, e) => {
  const t = Rc((i) => i.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const o = n.doc.nodeAt(r);
  return t.node.type === (o == null ? void 0 : o.type) && En(n.doc, t.pos) && n.join(t.pos), !0;
}, Da = (n, e) => {
  const t = Rc((i) => i.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const o = n.doc.nodeAt(r);
  return t.node.type === (o == null ? void 0 : o.type) && En(n.doc, r) && n.join(r), !0;
}, Yk = (n, e, t, r = {}) => ({ editor: o, tr: s, state: i, dispatch: a, chain: l, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = o.extensionManager, p = De(n, i.schema), h = De(e, i.schema), { selection: m, storedMarks: g } = i, { $from: b, $to: v } = m, x = b.blockRange(v), y = g || m.$to.parentOffset && m.$from.marks();
  if (!x)
    return !1;
  const w = Rc((k) => Td(k.type.name, d))(m);
  if (x.depth >= 1 && w && x.depth - w.depth <= 1) {
    if (w.node.type === p)
      return c.liftListItem(h);
    if (Td(w.node.type.name, d) && p.validContent(w.node.content) && a)
      return l().command(() => (s.setNodeMarkup(w.pos, p), !0)).command(() => Ma(s, p)).command(() => Da(s, p)).run();
  }
  return !t || !y || !a ? l().command(() => u().wrapInList(p, r) ? !0 : c.clearNodes()).wrapInList(p, r).command(() => Ma(s, p)).command(() => Da(s, p)).run() : l().command(() => {
    const k = u().wrapInList(p, r), S = y.filter((E) => f.includes(E.type.name));
    return s.ensureMarks(S), k ? !0 : c.clearNodes();
  }).wrapInList(p, r).command(() => Ma(s, p)).command(() => Da(s, p)).run();
}, Xk = (n, e = {}, t = {}) => ({ state: r, commands: o }) => {
  const { extendEmptyMarkRange: s = !1 } = t, i = Tn(n, r.schema);
  return Ml(r, i, e) ? o.unsetMark(i, { extendEmptyMarkRange: s }) : o.setMark(i, e);
}, Qk = (n, e, t = {}) => ({ state: r, commands: o }) => {
  const s = De(n, r.schema), i = De(e, r.schema);
  return Po(r, s, t) ? o.setNode(i) : o.setNode(s, t);
}, e1 = (n, e = {}) => ({ state: t, commands: r }) => {
  const o = De(n, t.schema);
  return Po(t, o, e) ? r.lift(o) : r.wrapIn(o, e);
}, t1 = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const o = t[r];
    let s;
    if (o.spec.isInputRules && (s = o.getState(n))) {
      if (e) {
        const i = n.tr, a = s.transform;
        for (let l = a.steps.length - 1; l >= 0; l -= 1)
          i.step(a.steps[l].invert(a.docs[l]));
        if (s.text) {
          const l = i.doc.resolve(s.from).marks();
          i.replaceWith(s.from, s.to, n.schema.text(s.text, l));
        } else
          i.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, n1 = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: o } = t;
  return r || e && o.forEach((s) => {
    n.removeMark(s.$from.pos, s.$to.pos);
  }), !0;
}, r1 = (n, e = {}) => ({ tr: t, state: r, dispatch: o }) => {
  var s;
  const { extendEmptyMarkRange: i = !1 } = e, { selection: a } = t, l = Tn(n, r.schema), { $from: c, empty: u, ranges: d } = a;
  if (!o)
    return !0;
  if (u && i) {
    let { from: f, to: p } = a;
    const h = (s = c.marks().find((g) => g.type === l)) === null || s === void 0 ? void 0 : s.attrs, m = Mc(c, l, h);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, l);
    });
  return t.removeStoredMark(l), !0;
}, o1 = (n, e = {}) => ({ tr: t, state: r, dispatch: o }) => {
  let s = null, i = null;
  const a = $i(typeof n == "string" ? n : n.name, r.schema);
  return a ? (a === "node" && (s = De(n, r.schema)), a === "mark" && (i = Tn(n, r.schema)), o && t.selection.ranges.forEach((l) => {
    const c = l.$from.pos, u = l.$to.pos;
    r.doc.nodesBetween(c, u, (d, f) => {
      s && s === d.type && t.setNodeMarkup(f, void 0, {
        ...d.attrs,
        ...e
      }), i && d.marks.length && d.marks.forEach((p) => {
        if (i === p.type) {
          const h = Math.max(f, c), m = Math.min(f + d.nodeSize, u);
          t.addMark(h, m, i.create({
            ...p.attrs,
            ...e
          }));
        }
      });
    });
  }), !0) : !1;
}, s1 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const o = De(n, t.schema);
  return kv(o, e)(t, r);
}, i1 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const o = De(n, t.schema);
  return xv(o, e)(t, r);
};
var a1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: Hv,
  clearContent: jv,
  clearNodes: Vv,
  command: Uv,
  createParagraphNear: Wv,
  cut: Kv,
  deleteCurrentNode: Jv,
  deleteNode: Gv,
  deleteRange: Zv,
  deleteSelection: Yv,
  enter: Xv,
  exitCode: Qv,
  extendMarkRange: tk,
  first: nk,
  focus: rk,
  forEach: ok,
  insertContent: sk,
  insertContentAt: lk,
  joinUp: ck,
  joinDown: uk,
  joinBackward: dk,
  joinForward: fk,
  joinItemBackward: pk,
  joinItemForward: hk,
  keyboardShortcut: gk,
  lift: yk,
  liftEmptyBlock: bk,
  liftListItem: vk,
  newlineInCode: kk,
  resetAttributes: xk,
  scrollIntoView: wk,
  selectAll: Sk,
  selectNodeBackward: Ck,
  selectNodeForward: Ek,
  selectParentNode: Ak,
  selectTextblockEnd: Tk,
  selectTextblockStart: Ok,
  setContent: Mk,
  setMark: jk,
  setMeta: Vk,
  setNode: Uk,
  setNodeSelection: Wk,
  setTextSelection: Kk,
  sinkListItem: Jk,
  splitBlock: Gk,
  splitListItem: Zk,
  toggleList: Yk,
  toggleMark: Xk,
  toggleNode: Qk,
  toggleWrap: e1,
  undoInputRule: t1,
  unsetAllMarks: n1,
  unsetMark: r1,
  updateAttributes: o1,
  wrapIn: s1,
  wrapInList: i1
});
const l1 = ye.create({
  name: "commands",
  addCommands() {
    return {
      ...a1
    };
  }
}), c1 = ye.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new be({
        key: new Pe("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), u1 = ye.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new be({
        key: new Pe("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), d1 = ye.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: i }) => [
      () => i.undoInputRule(),
      // maybe convert first text block node to default node
      () => i.command(({ tr: a }) => {
        const { selection: l, doc: c } = a, { empty: u, $anchor: d } = l, { pos: f, parent: p } = d, h = d.parent.isTextblock ? a.doc.resolve(f - 1) : d, m = h.parent.type.spec.isolating, g = d.pos - d.parentOffset, b = m && h.parent.childCount === 1 ? g === d.pos : X.atStart(c).from === f;
        return !u || !b || !p.type.isTextblock || p.textContent.length ? !1 : i.clearNodes();
      }),
      () => i.deleteSelection(),
      () => i.joinBackward(),
      () => i.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: i }) => [
      () => i.deleteSelection(),
      () => i.deleteCurrentNode(),
      () => i.joinForward(),
      () => i.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: i }) => [
        () => i.newlineInCode(),
        () => i.createParagraphNear(),
        () => i.liftEmptyBlock(),
        () => i.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, o = {
      ...r
    }, s = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return _c() || Nc() ? s : o;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new be({
        key: new Pe("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (!(n.some((h) => h.docChanged) && !e.doc.eq(t.doc)))
            return;
          const { empty: o, from: s, to: i } = e.selection, a = X.atStart(e.doc).from, l = X.atEnd(e.doc).to;
          if (o || !(s === a && i === l) || !(t.doc.textBetween(0, t.doc.content.size, " ", " ").length === 0))
            return;
          const d = t.tr, f = Bi({
            state: t,
            transaction: d
          }), { commands: p } = new Fi({
            editor: this.editor,
            state: f
          });
          if (p.clearNodes(), !!d.steps.length)
            return d;
        }
      })
    ];
  }
}), f1 = ye.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new be({
        key: new Pe("tabindex"),
        props: {
          attributes: this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
var tm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ClipboardTextSerializer: $v,
  Commands: l1,
  Editable: c1,
  FocusEvents: u1,
  Keymap: d1,
  Tabindex: f1
});
const p1 = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 1px !important;
  height: 1px !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function h1(n, e, t) {
  const r = document.querySelector(`style[data-tiptap-style${t ? `-${t}` : ""}]`);
  if (r !== null)
    return r;
  const o = document.createElement("style");
  return e && o.setAttribute("nonce", e), o.setAttribute(`data-tiptap-style${t ? `-${t}` : ""}`, ""), o.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(o), o;
}
let m1 = class extends Tv {
  constructor(e = {}) {
    super(), this.isFocused = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }));
    }, 0);
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && document && (this.css = h1(p1, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(e = {}) {
    this.options = {
      ...this.options,
      ...e
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(e, t = !0) {
    this.setOptions({ editable: e }), t && this.emit("update", { editor: this, transaction: this.state.tr });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   */
  registerPlugin(e, t) {
    const r = Jh(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], o = this.state.reconfigure({ plugins: r });
    this.view.updateState(o);
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKey The plugins name
   */
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const t = typeof e == "string" ? `${e}$` : e.key, r = this.state.reconfigure({
      // @ts-ignore
      plugins: this.state.plugins.filter((o) => !o.key.startsWith(t))
    });
    this.view.updateState(r);
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    const t = [...this.options.enableCoreExtensions ? Object.values(tm) : [], ...this.options.extensions].filter((r) => ["extension", "node", "mark"].includes(r == null ? void 0 : r.type));
    this.extensionManager = new Mr(t, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new Fi({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView() {
    const e = Xh(this.options.content, this.schema, this.options.parseOptions), t = Yh(e, this.options.autofocus);
    this.view = new Wb(this.options.element, {
      ...this.options.editorProps,
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: Or.create({
        doc: e,
        selection: t || void 0
      })
    });
    const r = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(r), this.createNodeViews(), this.prependClass();
    const o = this.view.dom;
    o.editor = this;
  }
  /**
   * Creates all node views.
   */
  createNodeViews() {
    this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const t = this.capturedTransaction;
    return this.capturedTransaction = null, t;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(e) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = e;
        return;
      }
      e.steps.forEach((i) => {
        var a;
        return (a = this.capturedTransaction) === null || a === void 0 ? void 0 : a.step(i);
      });
      return;
    }
    const t = this.state.apply(e), r = !this.state.selection.eq(t.selection);
    this.view.updateState(t), this.emit("transaction", {
      editor: this,
      transaction: e
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const o = e.getMeta("focus"), s = e.getMeta("blur");
    o && this.emit("focus", {
      editor: this,
      event: o.event,
      transaction: e
    }), s && this.emit("blur", {
      editor: this,
      event: s.event,
      transaction: e
    }), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: e
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(e) {
    return Qh(this.state, e);
  }
  isActive(e, t) {
    const r = typeof e == "string" ? e : null, o = typeof e == "string" ? t : e;
    return qk(this.state, r, o);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return Lc(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: r = {} } = e || {};
    return Lk(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...Zh(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return zk(this.state.doc);
  }
  /**
   * Get the number of characters for the current document.
   *
   * @deprecated
   */
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    this.emit("destroy"), this.view && this.view.destroy(), this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var e;
    return !(!((e = this.view) === null || e === void 0) && e.docView);
  }
};
function ir(n) {
  return new Jo({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const o = Y(n.getAttributes, void 0, r);
      if (o === !1 || o === null)
        return null;
      const { tr: s } = e, i = r[r.length - 1], a = r[0];
      if (i) {
        const l = a.search(/\S/), c = t.from + a.indexOf(i), u = c + i.length;
        if (Pc(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((m) => m === n.type && m !== p.mark.type)).filter((p) => p.to > c).length)
          return null;
        u < t.to && s.delete(u, t.to), c > t.from && s.delete(t.from + l, c);
        const f = t.from + l + i.length;
        s.addMark(t.from + l, f, n.type.create(o || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
function nm(n) {
  return new Jo({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const o = Y(n.getAttributes, void 0, r) || {}, { tr: s } = e, i = t.from;
      let a = t.to;
      const l = n.type.create(o);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = i + c;
        u > a ? u = a : a = u + r[1].length;
        const d = r[0][r[0].length - 1];
        s.insertText(d, i + r[0].length - 1), s.replaceWith(u, a, l);
      } else
        r[0] && s.insert(i - 1, n.type.create(o)).delete(s.mapping.map(i), s.mapping.map(a));
      s.scrollIntoView();
    }
  });
}
function Dl(n) {
  return new Jo({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const o = e.doc.resolve(t.from), s = Y(n.getAttributes, void 0, r) || {};
      if (!o.node(-1).canReplaceWith(o.index(-1), o.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, s);
    }
  });
}
function Ur(n) {
  return new Jo({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: o }) => {
      const s = Y(n.getAttributes, void 0, r) || {}, i = e.tr.delete(t.from, t.to), l = i.doc.resolve(t.from).blockRange(), c = l && mc(l, n.type, s);
      if (!c)
        return null;
      if (i.wrap(l, c), n.keepMarks && n.editor) {
        const { selection: d, storedMarks: f } = e, { splittableMarks: p } = n.editor.extensionManager, h = f || d.$to.parentOffset && d.$from.marks();
        if (h) {
          const m = h.filter((g) => p.includes(g.type.name));
          i.ensureMarks(m);
        }
      }
      if (n.keepAttributes) {
        const d = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        o().updateAttributes(d, s).run();
      }
      const u = i.doc.resolve(t.from - 1).nodeBefore;
      u && u.type === n.type && En(i.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, u)) && i.join(t.from - 1);
    }
  });
}
class ke {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = Y(P(this, "addOptions", {
      name: this.name
    }))), this.storage = Y(P(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ke(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = zi(this.options, e), t.storage = Y(P(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new ke(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = Y(P(t, "addOptions", {
      name: t.name
    })), t.storage = Y(P(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, o = e.state.selection.$from;
    if (o.pos === o.end()) {
      const i = o.marks();
      if (!!!i.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const l = i.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return l && r.removeStoredMark(l), r.insertText(" ", o.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
}
let se = class _l {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = Y(P(this, "addOptions", {
      name: this.name
    }))), this.storage = Y(P(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new _l(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = zi(this.options, e), t.storage = Y(P(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new _l(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = Y(P(t, "addOptions", {
      name: t.name
    })), t.storage = Y(P(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
};
function ar(n) {
  return new Pv({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: o }) => {
      const s = Y(n.getAttributes, void 0, r, o);
      if (s === !1 || s === null)
        return null;
      const { tr: i } = e, a = r[r.length - 1], l = r[0];
      let c = t.to;
      if (a) {
        const u = l.search(/\S/), d = t.from + l.indexOf(a), f = d + a.length;
        if (Pc(t.from, t.to, e.doc).filter((h) => h.mark.type.excluded.find((g) => g === n.type && g !== h.mark.type)).filter((h) => h.to > d).length)
          return null;
        f < t.to && i.delete(f, t.to), d > t.from && i.delete(t.from + u, d), c = t.from + u + a.length, i.addMark(t.from + u, c, n.type.create(s || {})), i.removeStoredMark(n.type);
      }
    }
  });
}
function g1(n) {
  return n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Qe = "top", mt = "bottom", gt = "right", et = "left", Ic = "auto", Zo = [Qe, mt, gt, et], Wr = "start", Io = "end", y1 = "clippingParents", rm = "viewport", fo = "popper", b1 = "reference", Md = /* @__PURE__ */ Zo.reduce(function(n, e) {
  return n.concat([e + "-" + Wr, e + "-" + Io]);
}, []), om = /* @__PURE__ */ [].concat(Zo, [Ic]).reduce(function(n, e) {
  return n.concat([e, e + "-" + Wr, e + "-" + Io]);
}, []), v1 = "beforeRead", k1 = "read", x1 = "afterRead", w1 = "beforeMain", S1 = "main", C1 = "afterMain", E1 = "beforeWrite", A1 = "write", T1 = "afterWrite", O1 = [v1, k1, x1, w1, S1, C1, E1, A1, T1];
function Ht(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function it(n) {
  if (n == null)
    return window;
  if (n.toString() !== "[object Window]") {
    var e = n.ownerDocument;
    return e && e.defaultView || window;
  }
  return n;
}
function lr(n) {
  var e = it(n).Element;
  return n instanceof e || n instanceof Element;
}
function ht(n) {
  var e = it(n).HTMLElement;
  return n instanceof e || n instanceof HTMLElement;
}
function Bc(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = it(n).ShadowRoot;
  return n instanceof e || n instanceof ShadowRoot;
}
function M1(n) {
  var e = n.state;
  Object.keys(e.elements).forEach(function(t) {
    var r = e.styles[t] || {}, o = e.attributes[t] || {}, s = e.elements[t];
    !ht(s) || !Ht(s) || (Object.assign(s.style, r), Object.keys(o).forEach(function(i) {
      var a = o[i];
      a === !1 ? s.removeAttribute(i) : s.setAttribute(i, a === !0 ? "" : a);
    }));
  });
}
function D1(n) {
  var e = n.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var o = e.elements[r], s = e.attributes[r] || {}, i = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : t[r]), a = i.reduce(function(l, c) {
        return l[c] = "", l;
      }, {});
      !ht(o) || !Ht(o) || (Object.assign(o.style, a), Object.keys(s).forEach(function(l) {
        o.removeAttribute(l);
      }));
    });
  };
}
const sm = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: M1,
  effect: D1,
  requires: ["computeStyles"]
};
function qt(n) {
  return n.split("-")[0];
}
var Yn = Math.max, Xs = Math.min, Kr = Math.round;
function Nl() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function im() {
  return !/^((?!chrome|android).)*safari/i.test(Nl());
}
function Jr(n, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var r = n.getBoundingClientRect(), o = 1, s = 1;
  e && ht(n) && (o = n.offsetWidth > 0 && Kr(r.width) / n.offsetWidth || 1, s = n.offsetHeight > 0 && Kr(r.height) / n.offsetHeight || 1);
  var i = lr(n) ? it(n) : window, a = i.visualViewport, l = !im() && t, c = (r.left + (l && a ? a.offsetLeft : 0)) / o, u = (r.top + (l && a ? a.offsetTop : 0)) / s, d = r.width / o, f = r.height / s;
  return {
    width: d,
    height: f,
    top: u,
    right: c + d,
    bottom: u + f,
    left: c,
    x: c,
    y: u
  };
}
function Fc(n) {
  var e = Jr(n), t = n.offsetWidth, r = n.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: t,
    height: r
  };
}
function am(n, e) {
  var t = e.getRootNode && e.getRootNode();
  if (n.contains(e))
    return !0;
  if (t && Bc(t)) {
    var r = e;
    do {
      if (r && n.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function nn(n) {
  return it(n).getComputedStyle(n);
}
function _1(n) {
  return ["table", "td", "th"].indexOf(Ht(n)) >= 0;
}
function On(n) {
  return ((lr(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function Hi(n) {
  return Ht(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    (Bc(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    On(n)
  );
}
function Dd(n) {
  return !ht(n) || // https://github.com/popperjs/popper-core/issues/837
  nn(n).position === "fixed" ? null : n.offsetParent;
}
function N1(n) {
  var e = /firefox/i.test(Nl()), t = /Trident/i.test(Nl());
  if (t && ht(n)) {
    var r = nn(n);
    if (r.position === "fixed")
      return null;
  }
  var o = Hi(n);
  for (Bc(o) && (o = o.host); ht(o) && ["html", "body"].indexOf(Ht(o)) < 0; ) {
    var s = nn(o);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || e && s.willChange === "filter" || e && s.filter && s.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Yo(n) {
  for (var e = it(n), t = Dd(n); t && _1(t) && nn(t).position === "static"; )
    t = Dd(t);
  return t && (Ht(t) === "html" || Ht(t) === "body" && nn(t).position === "static") ? e : t || N1(n) || e;
}
function qc(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function wo(n, e, t) {
  return Yn(n, Xs(e, t));
}
function R1(n, e, t) {
  var r = wo(n, e, t);
  return r > t ? t : r;
}
function lm() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function cm(n) {
  return Object.assign({}, lm(), n);
}
function um(n, e) {
  return e.reduce(function(t, r) {
    return t[r] = n, t;
  }, {});
}
var L1 = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, cm(typeof e != "number" ? e : um(e, Zo));
};
function P1(n) {
  var e, t = n.state, r = n.name, o = n.options, s = t.elements.arrow, i = t.modifiersData.popperOffsets, a = qt(t.placement), l = qc(a), c = [et, gt].indexOf(a) >= 0, u = c ? "height" : "width";
  if (!(!s || !i)) {
    var d = L1(o.padding, t), f = Fc(s), p = l === "y" ? Qe : et, h = l === "y" ? mt : gt, m = t.rects.reference[u] + t.rects.reference[l] - i[l] - t.rects.popper[u], g = i[l] - t.rects.reference[l], b = Yo(s), v = b ? l === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, x = m / 2 - g / 2, y = d[p], w = v - f[u] - d[h], k = v / 2 - f[u] / 2 + x, S = wo(y, k, w), E = l;
    t.modifiersData[r] = (e = {}, e[E] = S, e.centerOffset = S - k, e);
  }
}
function I1(n) {
  var e = n.state, t = n.options, r = t.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || am(e.elements.popper, o) && (e.elements.arrow = o));
}
const B1 = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: P1,
  effect: I1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Gr(n) {
  return n.split("-")[1];
}
var F1 = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function q1(n, e) {
  var t = n.x, r = n.y, o = e.devicePixelRatio || 1;
  return {
    x: Kr(t * o) / o || 0,
    y: Kr(r * o) / o || 0
  };
}
function _d(n) {
  var e, t = n.popper, r = n.popperRect, o = n.placement, s = n.variation, i = n.offsets, a = n.position, l = n.gpuAcceleration, c = n.adaptive, u = n.roundOffsets, d = n.isFixed, f = i.x, p = f === void 0 ? 0 : f, h = i.y, m = h === void 0 ? 0 : h, g = typeof u == "function" ? u({
    x: p,
    y: m
  }) : {
    x: p,
    y: m
  };
  p = g.x, m = g.y;
  var b = i.hasOwnProperty("x"), v = i.hasOwnProperty("y"), x = et, y = Qe, w = window;
  if (c) {
    var k = Yo(t), S = "clientHeight", E = "clientWidth";
    if (k === it(t) && (k = On(t), nn(k).position !== "static" && a === "absolute" && (S = "scrollHeight", E = "scrollWidth")), k = k, o === Qe || (o === et || o === gt) && s === Io) {
      y = mt;
      var T = d && k === w && w.visualViewport ? w.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        k[S]
      );
      m -= T - r.height, m *= l ? 1 : -1;
    }
    if (o === et || (o === Qe || o === mt) && s === Io) {
      x = gt;
      var D = d && k === w && w.visualViewport ? w.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        k[E]
      );
      p -= D - r.width, p *= l ? 1 : -1;
    }
  }
  var N = Object.assign({
    position: a
  }, c && F1), z = u === !0 ? q1({
    x: p,
    y: m
  }, it(t)) : {
    x: p,
    y: m
  };
  if (p = z.x, m = z.y, l) {
    var I;
    return Object.assign({}, N, (I = {}, I[y] = v ? "0" : "", I[x] = b ? "0" : "", I.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", I));
  }
  return Object.assign({}, N, (e = {}, e[y] = v ? m + "px" : "", e[x] = b ? p + "px" : "", e.transform = "", e));
}
function z1(n) {
  var e = n.state, t = n.options, r = t.gpuAcceleration, o = r === void 0 ? !0 : r, s = t.adaptive, i = s === void 0 ? !0 : s, a = t.roundOffsets, l = a === void 0 ? !0 : a, c = {
    placement: qt(e.placement),
    variation: Gr(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, _d(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: i,
    roundOffsets: l
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, _d(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const $1 = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: z1,
  data: {}
};
var ys = {
  passive: !0
};
function H1(n) {
  var e = n.state, t = n.instance, r = n.options, o = r.scroll, s = o === void 0 ? !0 : o, i = r.resize, a = i === void 0 ? !0 : i, l = it(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return s && c.forEach(function(u) {
    u.addEventListener("scroll", t.update, ys);
  }), a && l.addEventListener("resize", t.update, ys), function() {
    s && c.forEach(function(u) {
      u.removeEventListener("scroll", t.update, ys);
    }), a && l.removeEventListener("resize", t.update, ys);
  };
}
const j1 = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: H1,
  data: {}
};
var V1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ns(n) {
  return n.replace(/left|right|bottom|top/g, function(e) {
    return V1[e];
  });
}
var U1 = {
  start: "end",
  end: "start"
};
function Nd(n) {
  return n.replace(/start|end/g, function(e) {
    return U1[e];
  });
}
function zc(n) {
  var e = it(n), t = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: r
  };
}
function $c(n) {
  return Jr(On(n)).left + zc(n).scrollLeft;
}
function W1(n, e) {
  var t = it(n), r = On(n), o = t.visualViewport, s = r.clientWidth, i = r.clientHeight, a = 0, l = 0;
  if (o) {
    s = o.width, i = o.height;
    var c = im();
    (c || !c && e === "fixed") && (a = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: s,
    height: i,
    x: a + $c(n),
    y: l
  };
}
function K1(n) {
  var e, t = On(n), r = zc(n), o = (e = n.ownerDocument) == null ? void 0 : e.body, s = Yn(t.scrollWidth, t.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Yn(t.scrollHeight, t.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + $c(n), l = -r.scrollTop;
  return nn(o || t).direction === "rtl" && (a += Yn(t.clientWidth, o ? o.clientWidth : 0) - s), {
    width: s,
    height: i,
    x: a,
    y: l
  };
}
function Hc(n) {
  var e = nn(n), t = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + o + r);
}
function dm(n) {
  return ["html", "body", "#document"].indexOf(Ht(n)) >= 0 ? n.ownerDocument.body : ht(n) && Hc(n) ? n : dm(Hi(n));
}
function So(n, e) {
  var t;
  e === void 0 && (e = []);
  var r = dm(n), o = r === ((t = n.ownerDocument) == null ? void 0 : t.body), s = it(r), i = o ? [s].concat(s.visualViewport || [], Hc(r) ? r : []) : r, a = e.concat(i);
  return o ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(So(Hi(i)))
  );
}
function Rl(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function J1(n, e) {
  var t = Jr(n, !1, e === "fixed");
  return t.top = t.top + n.clientTop, t.left = t.left + n.clientLeft, t.bottom = t.top + n.clientHeight, t.right = t.left + n.clientWidth, t.width = n.clientWidth, t.height = n.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Rd(n, e, t) {
  return e === rm ? Rl(W1(n, t)) : lr(e) ? J1(e, t) : Rl(K1(On(n)));
}
function G1(n) {
  var e = So(Hi(n)), t = ["absolute", "fixed"].indexOf(nn(n).position) >= 0, r = t && ht(n) ? Yo(n) : n;
  return lr(r) ? e.filter(function(o) {
    return lr(o) && am(o, r) && Ht(o) !== "body";
  }) : [];
}
function Z1(n, e, t, r) {
  var o = e === "clippingParents" ? G1(n) : [].concat(e), s = [].concat(o, [t]), i = s[0], a = s.reduce(function(l, c) {
    var u = Rd(n, c, r);
    return l.top = Yn(u.top, l.top), l.right = Xs(u.right, l.right), l.bottom = Xs(u.bottom, l.bottom), l.left = Yn(u.left, l.left), l;
  }, Rd(n, i, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function fm(n) {
  var e = n.reference, t = n.element, r = n.placement, o = r ? qt(r) : null, s = r ? Gr(r) : null, i = e.x + e.width / 2 - t.width / 2, a = e.y + e.height / 2 - t.height / 2, l;
  switch (o) {
    case Qe:
      l = {
        x: i,
        y: e.y - t.height
      };
      break;
    case mt:
      l = {
        x: i,
        y: e.y + e.height
      };
      break;
    case gt:
      l = {
        x: e.x + e.width,
        y: a
      };
      break;
    case et:
      l = {
        x: e.x - t.width,
        y: a
      };
      break;
    default:
      l = {
        x: e.x,
        y: e.y
      };
  }
  var c = o ? qc(o) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (s) {
      case Wr:
        l[c] = l[c] - (e[u] / 2 - t[u] / 2);
        break;
      case Io:
        l[c] = l[c] + (e[u] / 2 - t[u] / 2);
        break;
    }
  }
  return l;
}
function Bo(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, o = r === void 0 ? n.placement : r, s = t.strategy, i = s === void 0 ? n.strategy : s, a = t.boundary, l = a === void 0 ? y1 : a, c = t.rootBoundary, u = c === void 0 ? rm : c, d = t.elementContext, f = d === void 0 ? fo : d, p = t.altBoundary, h = p === void 0 ? !1 : p, m = t.padding, g = m === void 0 ? 0 : m, b = cm(typeof g != "number" ? g : um(g, Zo)), v = f === fo ? b1 : fo, x = n.rects.popper, y = n.elements[h ? v : f], w = Z1(lr(y) ? y : y.contextElement || On(n.elements.popper), l, u, i), k = Jr(n.elements.reference), S = fm({
    reference: k,
    element: x,
    strategy: "absolute",
    placement: o
  }), E = Rl(Object.assign({}, x, S)), T = f === fo ? E : k, D = {
    top: w.top - T.top + b.top,
    bottom: T.bottom - w.bottom + b.bottom,
    left: w.left - T.left + b.left,
    right: T.right - w.right + b.right
  }, N = n.modifiersData.offset;
  if (f === fo && N) {
    var z = N[o];
    Object.keys(D).forEach(function(I) {
      var O = [gt, mt].indexOf(I) >= 0 ? 1 : -1, F = [Qe, mt].indexOf(I) >= 0 ? "y" : "x";
      D[I] += z[F] * O;
    });
  }
  return D;
}
function Y1(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, o = t.boundary, s = t.rootBoundary, i = t.padding, a = t.flipVariations, l = t.allowedAutoPlacements, c = l === void 0 ? om : l, u = Gr(r), d = u ? a ? Md : Md.filter(function(h) {
    return Gr(h) === u;
  }) : Zo, f = d.filter(function(h) {
    return c.indexOf(h) >= 0;
  });
  f.length === 0 && (f = d);
  var p = f.reduce(function(h, m) {
    return h[m] = Bo(n, {
      placement: m,
      boundary: o,
      rootBoundary: s,
      padding: i
    })[qt(m)], h;
  }, {});
  return Object.keys(p).sort(function(h, m) {
    return p[h] - p[m];
  });
}
function X1(n) {
  if (qt(n) === Ic)
    return [];
  var e = Ns(n);
  return [Nd(n), e, Nd(e)];
}
function Q1(n) {
  var e = n.state, t = n.options, r = n.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = t.mainAxis, s = o === void 0 ? !0 : o, i = t.altAxis, a = i === void 0 ? !0 : i, l = t.fallbackPlacements, c = t.padding, u = t.boundary, d = t.rootBoundary, f = t.altBoundary, p = t.flipVariations, h = p === void 0 ? !0 : p, m = t.allowedAutoPlacements, g = e.options.placement, b = qt(g), v = b === g, x = l || (v || !h ? [Ns(g)] : X1(g)), y = [g].concat(x).reduce(function(Q, ae) {
      return Q.concat(qt(ae) === Ic ? Y1(e, {
        placement: ae,
        boundary: u,
        rootBoundary: d,
        padding: c,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : ae);
    }, []), w = e.rects.reference, k = e.rects.popper, S = /* @__PURE__ */ new Map(), E = !0, T = y[0], D = 0; D < y.length; D++) {
      var N = y[D], z = qt(N), I = Gr(N) === Wr, O = [Qe, mt].indexOf(z) >= 0, F = O ? "width" : "height", L = Bo(e, {
        placement: N,
        boundary: u,
        rootBoundary: d,
        altBoundary: f,
        padding: c
      }), $ = O ? I ? gt : et : I ? mt : Qe;
      w[F] > k[F] && ($ = Ns($));
      var ee = Ns($), ne = [];
      if (s && ne.push(L[z] <= 0), a && ne.push(L[$] <= 0, L[ee] <= 0), ne.every(function(Q) {
        return Q;
      })) {
        T = N, E = !1;
        break;
      }
      S.set(N, ne);
    }
    if (E)
      for (var ve = h ? 3 : 1, Ce = function(ae) {
        var Ee = y.find(function(Ke) {
          var Je = S.get(Ke);
          if (Je)
            return Je.slice(0, ae).every(function(hr) {
              return hr;
            });
        });
        if (Ee)
          return T = Ee, "break";
      }, _e = ve; _e > 0; _e--) {
        var Z = Ce(_e);
        if (Z === "break")
          break;
      }
    e.placement !== T && (e.modifiersData[r]._skip = !0, e.placement = T, e.reset = !0);
  }
}
const ex = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Q1,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ld(n, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: n.top - e.height - t.y,
    right: n.right - e.width + t.x,
    bottom: n.bottom - e.height + t.y,
    left: n.left - e.width - t.x
  };
}
function Pd(n) {
  return [Qe, gt, mt, et].some(function(e) {
    return n[e] >= 0;
  });
}
function tx(n) {
  var e = n.state, t = n.name, r = e.rects.reference, o = e.rects.popper, s = e.modifiersData.preventOverflow, i = Bo(e, {
    elementContext: "reference"
  }), a = Bo(e, {
    altBoundary: !0
  }), l = Ld(i, r), c = Ld(a, o, s), u = Pd(l), d = Pd(c);
  e.modifiersData[t] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: d
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": d
  });
}
const nx = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: tx
};
function rx(n, e, t) {
  var r = qt(n), o = [et, Qe].indexOf(r) >= 0 ? -1 : 1, s = typeof t == "function" ? t(Object.assign({}, e, {
    placement: n
  })) : t, i = s[0], a = s[1];
  return i = i || 0, a = (a || 0) * o, [et, gt].indexOf(r) >= 0 ? {
    x: a,
    y: i
  } : {
    x: i,
    y: a
  };
}
function ox(n) {
  var e = n.state, t = n.options, r = n.name, o = t.offset, s = o === void 0 ? [0, 0] : o, i = om.reduce(function(u, d) {
    return u[d] = rx(d, e.rects, s), u;
  }, {}), a = i[e.placement], l = a.x, c = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = i;
}
const sx = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ox
};
function ix(n) {
  var e = n.state, t = n.name;
  e.modifiersData[t] = fm({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const ax = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ix,
  data: {}
};
function lx(n) {
  return n === "x" ? "y" : "x";
}
function cx(n) {
  var e = n.state, t = n.options, r = n.name, o = t.mainAxis, s = o === void 0 ? !0 : o, i = t.altAxis, a = i === void 0 ? !1 : i, l = t.boundary, c = t.rootBoundary, u = t.altBoundary, d = t.padding, f = t.tether, p = f === void 0 ? !0 : f, h = t.tetherOffset, m = h === void 0 ? 0 : h, g = Bo(e, {
    boundary: l,
    rootBoundary: c,
    padding: d,
    altBoundary: u
  }), b = qt(e.placement), v = Gr(e.placement), x = !v, y = qc(b), w = lx(y), k = e.modifiersData.popperOffsets, S = e.rects.reference, E = e.rects.popper, T = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, D = typeof T == "number" ? {
    mainAxis: T,
    altAxis: T
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, T), N = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, z = {
    x: 0,
    y: 0
  };
  if (k) {
    if (s) {
      var I, O = y === "y" ? Qe : et, F = y === "y" ? mt : gt, L = y === "y" ? "height" : "width", $ = k[y], ee = $ + g[O], ne = $ - g[F], ve = p ? -E[L] / 2 : 0, Ce = v === Wr ? S[L] : E[L], _e = v === Wr ? -E[L] : -S[L], Z = e.elements.arrow, Q = p && Z ? Fc(Z) : {
        width: 0,
        height: 0
      }, ae = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : lm(), Ee = ae[O], Ke = ae[F], Je = wo(0, S[L], Q[L]), hr = x ? S[L] / 2 - ve - Je - Ee - D.mainAxis : Ce - Je - Ee - D.mainAxis, sn = x ? -S[L] / 2 + ve + Je + Ke + D.mainAxis : _e + Je + Ke + D.mainAxis, mr = e.elements.arrow && Yo(e.elements.arrow), ns = mr ? y === "y" ? mr.clientTop || 0 : mr.clientLeft || 0 : 0, oo = (I = N == null ? void 0 : N[y]) != null ? I : 0, rs = $ + hr - oo - ns, ss = $ + sn - oo, so = wo(p ? Xs(ee, rs) : ee, $, p ? Yn(ne, ss) : ne);
      k[y] = so, z[y] = so - $;
    }
    if (a) {
      var io, is = y === "x" ? Qe : et, as = y === "x" ? mt : gt, Ut = k[w], an = w === "y" ? "height" : "width", ao = Ut + g[is], Dn = Ut - g[as], lo = [Qe, et].indexOf(b) !== -1, ls = (io = N == null ? void 0 : N[w]) != null ? io : 0, cs = lo ? ao : Ut - S[an] - E[an] - ls + D.altAxis, us = lo ? Ut + S[an] + E[an] - ls - D.altAxis : Dn, ds = p && lo ? R1(cs, Ut, us) : wo(p ? cs : ao, Ut, p ? us : Dn);
      k[w] = ds, z[w] = ds - Ut;
    }
    e.modifiersData[r] = z;
  }
}
const ux = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: cx,
  requiresIfExists: ["offset"]
};
function dx(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function fx(n) {
  return n === it(n) || !ht(n) ? zc(n) : dx(n);
}
function px(n) {
  var e = n.getBoundingClientRect(), t = Kr(e.width) / n.offsetWidth || 1, r = Kr(e.height) / n.offsetHeight || 1;
  return t !== 1 || r !== 1;
}
function hx(n, e, t) {
  t === void 0 && (t = !1);
  var r = ht(e), o = ht(e) && px(e), s = On(e), i = Jr(n, o, t), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (r || !r && !t) && ((Ht(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Hc(s)) && (a = fx(e)), ht(e) ? (l = Jr(e, !0), l.x += e.clientLeft, l.y += e.clientTop) : s && (l.x = $c(s))), {
    x: i.left + a.scrollLeft - l.x,
    y: i.top + a.scrollTop - l.y,
    width: i.width,
    height: i.height
  };
}
function mx(n) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), r = [];
  n.forEach(function(s) {
    e.set(s.name, s);
  });
  function o(s) {
    t.add(s.name);
    var i = [].concat(s.requires || [], s.requiresIfExists || []);
    i.forEach(function(a) {
      if (!t.has(a)) {
        var l = e.get(a);
        l && o(l);
      }
    }), r.push(s);
  }
  return n.forEach(function(s) {
    t.has(s.name) || o(s);
  }), r;
}
function gx(n) {
  var e = mx(n);
  return O1.reduce(function(t, r) {
    return t.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function yx(n) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(n());
      });
    })), e;
  };
}
function bx(n) {
  var e = n.reduce(function(t, r) {
    var o = t[r.name];
    return t[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var Id = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Bd() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function vx(n) {
  n === void 0 && (n = {});
  var e = n, t = e.defaultModifiers, r = t === void 0 ? [] : t, o = e.defaultOptions, s = o === void 0 ? Id : o;
  return function(a, l, c) {
    c === void 0 && (c = s);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Id, s),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, d = [], f = !1, p = {
      state: u,
      setOptions: function(b) {
        var v = typeof b == "function" ? b(u.options) : b;
        m(), u.options = Object.assign({}, s, u.options, v), u.scrollParents = {
          reference: lr(a) ? So(a) : a.contextElement ? So(a.contextElement) : [],
          popper: So(l)
        };
        var x = gx(bx([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = x.filter(function(y) {
          return y.enabled;
        }), h(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var b = u.elements, v = b.reference, x = b.popper;
          if (Bd(v, x)) {
            u.rects = {
              reference: hx(v, Yo(x), u.options.strategy === "fixed"),
              popper: Fc(x)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(D) {
              return u.modifiersData[D.name] = Object.assign({}, D.data);
            });
            for (var y = 0; y < u.orderedModifiers.length; y++) {
              if (u.reset === !0) {
                u.reset = !1, y = -1;
                continue;
              }
              var w = u.orderedModifiers[y], k = w.fn, S = w.options, E = S === void 0 ? {} : S, T = w.name;
              typeof k == "function" && (u = k({
                state: u,
                options: E,
                name: T,
                instance: p
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: yx(function() {
        return new Promise(function(g) {
          p.forceUpdate(), g(u);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!Bd(a, l))
      return p;
    p.setOptions(c).then(function(g) {
      !f && c.onFirstUpdate && c.onFirstUpdate(g);
    });
    function h() {
      u.orderedModifiers.forEach(function(g) {
        var b = g.name, v = g.options, x = v === void 0 ? {} : v, y = g.effect;
        if (typeof y == "function") {
          var w = y({
            state: u,
            name: b,
            instance: p,
            options: x
          }), k = function() {
          };
          d.push(w || k);
        }
      });
    }
    function m() {
      d.forEach(function(g) {
        return g();
      }), d = [];
    }
    return p;
  };
}
var kx = [j1, ax, $1, sm, sx, ex, ux, B1, nx], xx = /* @__PURE__ */ vx({
  defaultModifiers: kx
}), wx = "tippy-box", pm = "tippy-content", Sx = "tippy-backdrop", hm = "tippy-arrow", mm = "tippy-svg-arrow", Ln = {
  passive: !0,
  capture: !0
}, gm = function() {
  return document.body;
};
function Cx(n, e) {
  return {}.hasOwnProperty.call(n, e);
}
function _a(n, e, t) {
  if (Array.isArray(n)) {
    var r = n[e];
    return r ?? (Array.isArray(t) ? t[e] : t);
  }
  return n;
}
function jc(n, e) {
  var t = {}.toString.call(n);
  return t.indexOf("[object") === 0 && t.indexOf(e + "]") > -1;
}
function ym(n, e) {
  return typeof n == "function" ? n.apply(void 0, e) : n;
}
function Fd(n, e) {
  if (e === 0)
    return n;
  var t;
  return function(r) {
    clearTimeout(t), t = setTimeout(function() {
      n(r);
    }, e);
  };
}
function Ex(n, e) {
  var t = Object.assign({}, n);
  return e.forEach(function(r) {
    delete t[r];
  }), t;
}
function Ax(n) {
  return n.split(/\s+/).filter(Boolean);
}
function Cr(n) {
  return [].concat(n);
}
function qd(n, e) {
  n.indexOf(e) === -1 && n.push(e);
}
function Tx(n) {
  return n.filter(function(e, t) {
    return n.indexOf(e) === t;
  });
}
function Ox(n) {
  return n.split("-")[0];
}
function Qs(n) {
  return [].slice.call(n);
}
function zd(n) {
  return Object.keys(n).reduce(function(e, t) {
    return n[t] !== void 0 && (e[t] = n[t]), e;
  }, {});
}
function Co() {
  return document.createElement("div");
}
function Fo(n) {
  return ["Element", "Fragment"].some(function(e) {
    return jc(n, e);
  });
}
function Mx(n) {
  return jc(n, "NodeList");
}
function Dx(n) {
  return jc(n, "MouseEvent");
}
function _x(n) {
  return !!(n && n._tippy && n._tippy.reference === n);
}
function Nx(n) {
  return Fo(n) ? [n] : Mx(n) ? Qs(n) : Array.isArray(n) ? n : Qs(document.querySelectorAll(n));
}
function Na(n, e) {
  n.forEach(function(t) {
    t && (t.style.transitionDuration = e + "ms");
  });
}
function $d(n, e) {
  n.forEach(function(t) {
    t && t.setAttribute("data-state", e);
  });
}
function Rx(n) {
  var e, t = Cr(n), r = t[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function Lx(n, e) {
  var t = e.clientX, r = e.clientY;
  return n.every(function(o) {
    var s = o.popperRect, i = o.popperState, a = o.props, l = a.interactiveBorder, c = Ox(i.placement), u = i.modifiersData.offset;
    if (!u)
      return !0;
    var d = c === "bottom" ? u.top.y : 0, f = c === "top" ? u.bottom.y : 0, p = c === "right" ? u.left.x : 0, h = c === "left" ? u.right.x : 0, m = s.top - r + d > l, g = r - s.bottom - f > l, b = s.left - t + p > l, v = t - s.right - h > l;
    return m || g || b || v;
  });
}
function Ra(n, e, t) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(o) {
    n[r](o, t);
  });
}
function Hd(n, e) {
  for (var t = e; t; ) {
    var r;
    if (n.contains(t))
      return !0;
    t = t.getRootNode == null || (r = t.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var Rt = {
  isTouch: !1
}, jd = 0;
function Px() {
  Rt.isTouch || (Rt.isTouch = !0, window.performance && document.addEventListener("mousemove", bm));
}
function bm() {
  var n = performance.now();
  n - jd < 20 && (Rt.isTouch = !1, document.removeEventListener("mousemove", bm)), jd = n;
}
function Ix() {
  var n = document.activeElement;
  if (_x(n)) {
    var e = n._tippy;
    n.blur && !e.state.isVisible && n.blur();
  }
}
function Bx() {
  document.addEventListener("touchstart", Px, Ln), window.addEventListener("blur", Ix);
}
var Fx = typeof window < "u" && typeof document < "u", qx = Fx ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function vr(n) {
  var e = n === "destroy" ? "n already-" : " ";
  return [n + "() was called on a" + e + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function Vd(n) {
  var e = /[ \t]{2,}/g, t = /^[ \t]*/gm;
  return n.replace(e, " ").replace(t, "").trim();
}
function zx(n) {
  return Vd(`
  %ctippy.js

  %c` + Vd(n) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function vm(n) {
  return [
    zx(n),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var qo;
process.env.NODE_ENV !== "production" && $x();
function $x() {
  qo = /* @__PURE__ */ new Set();
}
function Gt(n, e) {
  if (n && !qo.has(e)) {
    var t;
    qo.add(e), (t = console).warn.apply(t, vm(e));
  }
}
function Ll(n, e) {
  if (n && !qo.has(e)) {
    var t;
    qo.add(e), (t = console).error.apply(t, vm(e));
  }
}
function Hx(n) {
  var e = !n, t = Object.prototype.toString.call(n) === "[object Object]" && !n.addEventListener;
  Ll(e, ["tippy() was passed", "`" + String(n) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), Ll(t, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var km = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, jx = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, ot = Object.assign({
  appendTo: gm,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, km, jx), Vx = Object.keys(ot), Ux = function(e) {
  process.env.NODE_ENV !== "production" && wm(e, []);
  var t = Object.keys(e);
  t.forEach(function(r) {
    ot[r] = e[r];
  });
};
function xm(n) {
  var e = n.plugins || [], t = e.reduce(function(r, o) {
    var s = o.name, i = o.defaultValue;
    if (s) {
      var a;
      r[s] = n[s] !== void 0 ? n[s] : (a = ot[s]) != null ? a : i;
    }
    return r;
  }, {});
  return Object.assign({}, n, t);
}
function Wx(n, e) {
  var t = e ? Object.keys(xm(Object.assign({}, ot, {
    plugins: e
  }))) : Vx, r = t.reduce(function(o, s) {
    var i = (n.getAttribute("data-tippy-" + s) || "").trim();
    if (!i)
      return o;
    if (s === "content")
      o[s] = i;
    else
      try {
        o[s] = JSON.parse(i);
      } catch {
        o[s] = i;
      }
    return o;
  }, {});
  return r;
}
function Ud(n, e) {
  var t = Object.assign({}, e, {
    content: ym(e.content, [n])
  }, e.ignoreAttributes ? {} : Wx(n, e.plugins));
  return t.aria = Object.assign({}, ot.aria, t.aria), t.aria = {
    expanded: t.aria.expanded === "auto" ? e.interactive : t.aria.expanded,
    content: t.aria.content === "auto" ? e.interactive ? null : "describedby" : t.aria.content
  }, t;
}
function wm(n, e) {
  n === void 0 && (n = {}), e === void 0 && (e = []);
  var t = Object.keys(n);
  t.forEach(function(r) {
    var o = Ex(ot, Object.keys(km)), s = !Cx(o, r);
    s && (s = e.filter(function(i) {
      return i.name === r;
    }).length === 0), Gt(s, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var Kx = function() {
  return "innerHTML";
};
function Pl(n, e) {
  n[Kx()] = e;
}
function Wd(n) {
  var e = Co();
  return n === !0 ? e.className = hm : (e.className = mm, Fo(n) ? e.appendChild(n) : Pl(e, n)), e;
}
function Kd(n, e) {
  Fo(e.content) ? (Pl(n, ""), n.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? Pl(n, e.content) : n.textContent = e.content);
}
function Il(n) {
  var e = n.firstElementChild, t = Qs(e.children);
  return {
    box: e,
    content: t.find(function(r) {
      return r.classList.contains(pm);
    }),
    arrow: t.find(function(r) {
      return r.classList.contains(hm) || r.classList.contains(mm);
    }),
    backdrop: t.find(function(r) {
      return r.classList.contains(Sx);
    })
  };
}
function Sm(n) {
  var e = Co(), t = Co();
  t.className = wx, t.setAttribute("data-state", "hidden"), t.setAttribute("tabindex", "-1");
  var r = Co();
  r.className = pm, r.setAttribute("data-state", "hidden"), Kd(r, n.props), e.appendChild(t), t.appendChild(r), o(n.props, n.props);
  function o(s, i) {
    var a = Il(e), l = a.box, c = a.content, u = a.arrow;
    i.theme ? l.setAttribute("data-theme", i.theme) : l.removeAttribute("data-theme"), typeof i.animation == "string" ? l.setAttribute("data-animation", i.animation) : l.removeAttribute("data-animation"), i.inertia ? l.setAttribute("data-inertia", "") : l.removeAttribute("data-inertia"), l.style.maxWidth = typeof i.maxWidth == "number" ? i.maxWidth + "px" : i.maxWidth, i.role ? l.setAttribute("role", i.role) : l.removeAttribute("role"), (s.content !== i.content || s.allowHTML !== i.allowHTML) && Kd(c, n.props), i.arrow ? u ? s.arrow !== i.arrow && (l.removeChild(u), l.appendChild(Wd(i.arrow))) : l.appendChild(Wd(i.arrow)) : u && l.removeChild(u);
  }
  return {
    popper: e,
    onUpdate: o
  };
}
Sm.$$tippy = !0;
var Jx = 1, bs = [], La = [];
function Gx(n, e) {
  var t = Ud(n, Object.assign({}, ot, xm(zd(e)))), r, o, s, i = !1, a = !1, l = !1, c = !1, u, d, f, p = [], h = Fd(rs, t.interactiveDebounce), m, g = Jx++, b = null, v = Tx(t.plugins), x = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, y = {
    // properties
    id: g,
    reference: n,
    popper: Co(),
    popperInstance: b,
    props: t,
    state: x,
    plugins: v,
    // methods
    clearDelayTimeouts: cs,
    setProps: us,
    setContent: ds,
    show: f0,
    hide: p0,
    hideWithInteractivity: h0,
    enable: lo,
    disable: ls,
    unmount: m0,
    destroy: g0
  };
  if (!t.render)
    return process.env.NODE_ENV !== "production" && Ll(!0, "render() function has not been supplied."), y;
  var w = t.render(y), k = w.popper, S = w.onUpdate;
  k.setAttribute("data-tippy-root", ""), k.id = "tippy-" + y.id, y.popper = k, n._tippy = y, k._tippy = y;
  var E = v.map(function(A) {
    return A.fn(y);
  }), T = n.hasAttribute("aria-expanded");
  return mr(), ve(), $(), ee("onCreate", [y]), t.showOnCreate && ao(), k.addEventListener("mouseenter", function() {
    y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
  }), k.addEventListener("mouseleave", function() {
    y.props.interactive && y.props.trigger.indexOf("mouseenter") >= 0 && O().addEventListener("mousemove", h);
  }), y;
  function D() {
    var A = y.props.touch;
    return Array.isArray(A) ? A : [A, 0];
  }
  function N() {
    return D()[0] === "hold";
  }
  function z() {
    var A;
    return !!((A = y.props.render) != null && A.$$tippy);
  }
  function I() {
    return m || n;
  }
  function O() {
    var A = I().parentNode;
    return A ? Rx(A) : document;
  }
  function F() {
    return Il(k);
  }
  function L(A) {
    return y.state.isMounted && !y.state.isVisible || Rt.isTouch || u && u.type === "focus" ? 0 : _a(y.props.delay, A ? 0 : 1, ot.delay);
  }
  function $(A) {
    A === void 0 && (A = !1), k.style.pointerEvents = y.props.interactive && !A ? "" : "none", k.style.zIndex = "" + y.props.zIndex;
  }
  function ee(A, B, U) {
    if (U === void 0 && (U = !0), E.forEach(function(te) {
      te[A] && te[A].apply(te, B);
    }), U) {
      var ce;
      (ce = y.props)[A].apply(ce, B);
    }
  }
  function ne() {
    var A = y.props.aria;
    if (A.content) {
      var B = "aria-" + A.content, U = k.id, ce = Cr(y.props.triggerTarget || n);
      ce.forEach(function(te) {
        var Fe = te.getAttribute(B);
        if (y.state.isVisible)
          te.setAttribute(B, Fe ? Fe + " " + U : U);
        else {
          var lt = Fe && Fe.replace(U, "").trim();
          lt ? te.setAttribute(B, lt) : te.removeAttribute(B);
        }
      });
    }
  }
  function ve() {
    if (!(T || !y.props.aria.expanded)) {
      var A = Cr(y.props.triggerTarget || n);
      A.forEach(function(B) {
        y.props.interactive ? B.setAttribute("aria-expanded", y.state.isVisible && B === I() ? "true" : "false") : B.removeAttribute("aria-expanded");
      });
    }
  }
  function Ce() {
    O().removeEventListener("mousemove", h), bs = bs.filter(function(A) {
      return A !== h;
    });
  }
  function _e(A) {
    if (!(Rt.isTouch && (l || A.type === "mousedown"))) {
      var B = A.composedPath && A.composedPath()[0] || A.target;
      if (!(y.props.interactive && Hd(k, B))) {
        if (Cr(y.props.triggerTarget || n).some(function(U) {
          return Hd(U, B);
        })) {
          if (Rt.isTouch || y.state.isVisible && y.props.trigger.indexOf("click") >= 0)
            return;
        } else
          ee("onClickOutside", [y, A]);
        y.props.hideOnClick === !0 && (y.clearDelayTimeouts(), y.hide(), a = !0, setTimeout(function() {
          a = !1;
        }), y.state.isMounted || Ee());
      }
    }
  }
  function Z() {
    l = !0;
  }
  function Q() {
    l = !1;
  }
  function ae() {
    var A = O();
    A.addEventListener("mousedown", _e, !0), A.addEventListener("touchend", _e, Ln), A.addEventListener("touchstart", Q, Ln), A.addEventListener("touchmove", Z, Ln);
  }
  function Ee() {
    var A = O();
    A.removeEventListener("mousedown", _e, !0), A.removeEventListener("touchend", _e, Ln), A.removeEventListener("touchstart", Q, Ln), A.removeEventListener("touchmove", Z, Ln);
  }
  function Ke(A, B) {
    hr(A, function() {
      !y.state.isVisible && k.parentNode && k.parentNode.contains(k) && B();
    });
  }
  function Je(A, B) {
    hr(A, B);
  }
  function hr(A, B) {
    var U = F().box;
    function ce(te) {
      te.target === U && (Ra(U, "remove", ce), B());
    }
    if (A === 0)
      return B();
    Ra(U, "remove", d), Ra(U, "add", ce), d = ce;
  }
  function sn(A, B, U) {
    U === void 0 && (U = !1);
    var ce = Cr(y.props.triggerTarget || n);
    ce.forEach(function(te) {
      te.addEventListener(A, B, U), p.push({
        node: te,
        eventType: A,
        handler: B,
        options: U
      });
    });
  }
  function mr() {
    N() && (sn("touchstart", oo, {
      passive: !0
    }), sn("touchend", ss, {
      passive: !0
    })), Ax(y.props.trigger).forEach(function(A) {
      if (A !== "manual")
        switch (sn(A, oo), A) {
          case "mouseenter":
            sn("mouseleave", ss);
            break;
          case "focus":
            sn(qx ? "focusout" : "blur", so);
            break;
          case "focusin":
            sn("focusout", so);
            break;
        }
    });
  }
  function ns() {
    p.forEach(function(A) {
      var B = A.node, U = A.eventType, ce = A.handler, te = A.options;
      B.removeEventListener(U, ce, te);
    }), p = [];
  }
  function oo(A) {
    var B, U = !1;
    if (!(!y.state.isEnabled || io(A) || a)) {
      var ce = ((B = u) == null ? void 0 : B.type) === "focus";
      u = A, m = A.currentTarget, ve(), !y.state.isVisible && Dx(A) && bs.forEach(function(te) {
        return te(A);
      }), A.type === "click" && (y.props.trigger.indexOf("mouseenter") < 0 || i) && y.props.hideOnClick !== !1 && y.state.isVisible ? U = !0 : ao(A), A.type === "click" && (i = !U), U && !ce && Dn(A);
    }
  }
  function rs(A) {
    var B = A.target, U = I().contains(B) || k.contains(B);
    if (!(A.type === "mousemove" && U)) {
      var ce = an().concat(k).map(function(te) {
        var Fe, lt = te._tippy, gr = (Fe = lt.popperInstance) == null ? void 0 : Fe.state;
        return gr ? {
          popperRect: te.getBoundingClientRect(),
          popperState: gr,
          props: t
        } : null;
      }).filter(Boolean);
      Lx(ce, A) && (Ce(), Dn(A));
    }
  }
  function ss(A) {
    var B = io(A) || y.props.trigger.indexOf("click") >= 0 && i;
    if (!B) {
      if (y.props.interactive) {
        y.hideWithInteractivity(A);
        return;
      }
      Dn(A);
    }
  }
  function so(A) {
    y.props.trigger.indexOf("focusin") < 0 && A.target !== I() || y.props.interactive && A.relatedTarget && k.contains(A.relatedTarget) || Dn(A);
  }
  function io(A) {
    return Rt.isTouch ? N() !== A.type.indexOf("touch") >= 0 : !1;
  }
  function is() {
    as();
    var A = y.props, B = A.popperOptions, U = A.placement, ce = A.offset, te = A.getReferenceClientRect, Fe = A.moveTransition, lt = z() ? Il(k).arrow : null, gr = te ? {
      getBoundingClientRect: te,
      contextElement: te.contextElement || I()
    } : n, Eu = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(fs) {
        var yr = fs.state;
        if (z()) {
          var y0 = F(), ca = y0.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(ps) {
            ps === "placement" ? ca.setAttribute("data-placement", yr.placement) : yr.attributes.popper["data-popper-" + ps] ? ca.setAttribute("data-" + ps, "") : ca.removeAttribute("data-" + ps);
          }), yr.attributes.popper = {};
        }
      }
    }, _n = [{
      name: "offset",
      options: {
        offset: ce
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !Fe
      }
    }, Eu];
    z() && lt && _n.push({
      name: "arrow",
      options: {
        element: lt,
        padding: 3
      }
    }), _n.push.apply(_n, (B == null ? void 0 : B.modifiers) || []), y.popperInstance = xx(gr, k, Object.assign({}, B, {
      placement: U,
      onFirstUpdate: f,
      modifiers: _n
    }));
  }
  function as() {
    y.popperInstance && (y.popperInstance.destroy(), y.popperInstance = null);
  }
  function Ut() {
    var A = y.props.appendTo, B, U = I();
    y.props.interactive && A === gm || A === "parent" ? B = U.parentNode : B = ym(A, [U]), B.contains(k) || B.appendChild(k), y.state.isMounted = !0, is(), process.env.NODE_ENV !== "production" && Gt(y.props.interactive && A === ot.appendTo && U.nextElementSibling !== k, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function an() {
    return Qs(k.querySelectorAll("[data-tippy-root]"));
  }
  function ao(A) {
    y.clearDelayTimeouts(), A && ee("onTrigger", [y, A]), ae();
    var B = L(!0), U = D(), ce = U[0], te = U[1];
    Rt.isTouch && ce === "hold" && te && (B = te), B ? r = setTimeout(function() {
      y.show();
    }, B) : y.show();
  }
  function Dn(A) {
    if (y.clearDelayTimeouts(), ee("onUntrigger", [y, A]), !y.state.isVisible) {
      Ee();
      return;
    }
    if (!(y.props.trigger.indexOf("mouseenter") >= 0 && y.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(A.type) >= 0 && i)) {
      var B = L(!1);
      B ? o = setTimeout(function() {
        y.state.isVisible && y.hide();
      }, B) : s = requestAnimationFrame(function() {
        y.hide();
      });
    }
  }
  function lo() {
    y.state.isEnabled = !0;
  }
  function ls() {
    y.hide(), y.state.isEnabled = !1;
  }
  function cs() {
    clearTimeout(r), clearTimeout(o), cancelAnimationFrame(s);
  }
  function us(A) {
    if (process.env.NODE_ENV !== "production" && Gt(y.state.isDestroyed, vr("setProps")), !y.state.isDestroyed) {
      ee("onBeforeUpdate", [y, A]), ns();
      var B = y.props, U = Ud(n, Object.assign({}, B, zd(A), {
        ignoreAttributes: !0
      }));
      y.props = U, mr(), B.interactiveDebounce !== U.interactiveDebounce && (Ce(), h = Fd(rs, U.interactiveDebounce)), B.triggerTarget && !U.triggerTarget ? Cr(B.triggerTarget).forEach(function(ce) {
        ce.removeAttribute("aria-expanded");
      }) : U.triggerTarget && n.removeAttribute("aria-expanded"), ve(), $(), S && S(B, U), y.popperInstance && (is(), an().forEach(function(ce) {
        requestAnimationFrame(ce._tippy.popperInstance.forceUpdate);
      })), ee("onAfterUpdate", [y, A]);
    }
  }
  function ds(A) {
    y.setProps({
      content: A
    });
  }
  function f0() {
    process.env.NODE_ENV !== "production" && Gt(y.state.isDestroyed, vr("show"));
    var A = y.state.isVisible, B = y.state.isDestroyed, U = !y.state.isEnabled, ce = Rt.isTouch && !y.props.touch, te = _a(y.props.duration, 0, ot.duration);
    if (!(A || B || U || ce) && !I().hasAttribute("disabled") && (ee("onShow", [y], !1), y.props.onShow(y) !== !1)) {
      if (y.state.isVisible = !0, z() && (k.style.visibility = "visible"), $(), ae(), y.state.isMounted || (k.style.transition = "none"), z()) {
        var Fe = F(), lt = Fe.box, gr = Fe.content;
        Na([lt, gr], 0);
      }
      f = function() {
        var _n;
        if (!(!y.state.isVisible || c)) {
          if (c = !0, k.offsetHeight, k.style.transition = y.props.moveTransition, z() && y.props.animation) {
            var la = F(), fs = la.box, yr = la.content;
            Na([fs, yr], te), $d([fs, yr], "visible");
          }
          ne(), ve(), qd(La, y), (_n = y.popperInstance) == null || _n.forceUpdate(), ee("onMount", [y]), y.props.animation && z() && Je(te, function() {
            y.state.isShown = !0, ee("onShown", [y]);
          });
        }
      }, Ut();
    }
  }
  function p0() {
    process.env.NODE_ENV !== "production" && Gt(y.state.isDestroyed, vr("hide"));
    var A = !y.state.isVisible, B = y.state.isDestroyed, U = !y.state.isEnabled, ce = _a(y.props.duration, 1, ot.duration);
    if (!(A || B || U) && (ee("onHide", [y], !1), y.props.onHide(y) !== !1)) {
      if (y.state.isVisible = !1, y.state.isShown = !1, c = !1, i = !1, z() && (k.style.visibility = "hidden"), Ce(), Ee(), $(!0), z()) {
        var te = F(), Fe = te.box, lt = te.content;
        y.props.animation && (Na([Fe, lt], ce), $d([Fe, lt], "hidden"));
      }
      ne(), ve(), y.props.animation ? z() && Ke(ce, y.unmount) : y.unmount();
    }
  }
  function h0(A) {
    process.env.NODE_ENV !== "production" && Gt(y.state.isDestroyed, vr("hideWithInteractivity")), O().addEventListener("mousemove", h), qd(bs, h), h(A);
  }
  function m0() {
    process.env.NODE_ENV !== "production" && Gt(y.state.isDestroyed, vr("unmount")), y.state.isVisible && y.hide(), y.state.isMounted && (as(), an().forEach(function(A) {
      A._tippy.unmount();
    }), k.parentNode && k.parentNode.removeChild(k), La = La.filter(function(A) {
      return A !== y;
    }), y.state.isMounted = !1, ee("onHidden", [y]));
  }
  function g0() {
    process.env.NODE_ENV !== "production" && Gt(y.state.isDestroyed, vr("destroy")), !y.state.isDestroyed && (y.clearDelayTimeouts(), y.unmount(), ns(), delete n._tippy, y.state.isDestroyed = !0, ee("onDestroy", [y]));
  }
}
function pr(n, e) {
  e === void 0 && (e = {});
  var t = ot.plugins.concat(e.plugins || []);
  process.env.NODE_ENV !== "production" && (Hx(n), wm(e, t)), Bx();
  var r = Object.assign({}, e, {
    plugins: t
  }), o = Nx(n);
  if (process.env.NODE_ENV !== "production") {
    var s = Fo(r.content), i = o.length > 1;
    Gt(s && i, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var a = o.reduce(function(l, c) {
    var u = c && Gx(c, r);
    return u && l.push(u), l;
  }, []);
  return Fo(n) ? a[0] : a;
}
pr.defaultProps = ot;
pr.setDefaultProps = Ux;
pr.currentInput = Rt;
Object.assign({}, sm, {
  effect: function(e) {
    var t = e.state, r = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow);
  }
});
pr.setDefaultProps({
  render: Sm
});
class Zx {
  constructor({ editor: e, element: t, view: r, tippyOptions: o = {}, updateDelay: s = 250, shouldShow: i }) {
    this.preventHide = !1, this.shouldShow = ({ view: a, state: l, from: c, to: u }) => {
      const { doc: d, selection: f } = l, { empty: p } = f, h = !d.textBetween(c, u).length && Dc(l.selection), m = this.element.contains(document.activeElement);
      return !(!(a.hasFocus() || m) || p || h || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: a }) => {
      var l;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      a != null && a.relatedTarget && (!((l = this.element.parentNode) === null || l === void 0) && l.contains(a.relatedTarget)) || this.hide();
    }, this.tippyBlurHandler = (a) => {
      this.blurHandler({ event: a });
    }, this.handleDebouncedUpdate = (a, l) => {
      const c = !(l != null && l.selection.eq(a.state.selection)), u = !(l != null && l.doc.eq(a.state.doc));
      !c && !u || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(a, c, u, l);
      }, this.updateDelay));
    }, this.updateHandler = (a, l, c, u) => {
      var d, f, p;
      const { state: h, composing: m } = a, { selection: g } = h;
      if (m || !l && !c)
        return;
      this.createTooltip();
      const { ranges: v } = g, x = Math.min(...v.map((k) => k.$from.pos)), y = Math.max(...v.map((k) => k.$to.pos));
      if (!((d = this.shouldShow) === null || d === void 0 ? void 0 : d.call(this, {
        editor: this.editor,
        view: a,
        state: h,
        oldState: u,
        from: x,
        to: y
      }))) {
        this.hide();
        return;
      }
      (f = this.tippy) === null || f === void 0 || f.setProps({
        getReferenceClientRect: ((p = this.tippyOptions) === null || p === void 0 ? void 0 : p.getReferenceClientRect) || (() => {
          if ($k(h.selection)) {
            let k = a.nodeDOM(x);
            const S = k.dataset.nodeViewWrapper ? k : k.querySelector("[data-node-view-wrapper]");
            if (S && (k = S.firstChild), k)
              return k.getBoundingClientRect();
          }
          return em(a, x, y);
        })
      }), this.show();
    }, this.editor = e, this.element = t, this.view = r, this.updateDelay = s, i && (this.shouldShow = i), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = o, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = pr(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    const { state: r } = e, o = r.selection.$from.pos !== r.selection.$to.pos;
    if (this.updateDelay > 0 && o) {
      this.handleDebouncedUpdate(e, t);
      return;
    }
    const s = !(t != null && t.selection.eq(e.state.selection)), i = !(t != null && t.doc.eq(e.state.doc));
    this.updateHandler(e, s, i, t);
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Cm = (n) => new be({
  key: typeof n.pluginKey == "string" ? new Pe(n.pluginKey) : n.pluginKey,
  view: (e) => new Zx({ view: e, ...n })
});
ye.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Cm({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
class Yx {
  constructor({ editor: e, element: t, view: r, tippyOptions: o = {}, shouldShow: s }) {
    this.preventHide = !1, this.shouldShow = ({ view: i, state: a }) => {
      const { selection: l } = a, { $anchor: c, empty: u } = l, d = c.depth === 1, f = c.parent.isTextblock && !c.parent.type.spec.code && !c.parent.textContent;
      return !(!i.hasFocus() || !u || !d || !f || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: i }) => {
      var a;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      i != null && i.relatedTarget && (!((a = this.element.parentNode) === null || a === void 0) && a.contains(i.relatedTarget)) || this.hide();
    }, this.tippyBlurHandler = (i) => {
      this.blurHandler({ event: i });
    }, this.editor = e, this.element = t, this.view = r, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = o, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = pr(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    var r, o, s;
    const { state: i } = e, { doc: a, selection: l } = i, { from: c, to: u } = l;
    if (t && t.doc.eq(a) && t.selection.eq(l))
      return;
    if (this.createTooltip(), !((r = this.shouldShow) === null || r === void 0 ? void 0 : r.call(this, {
      editor: this.editor,
      view: e,
      state: i,
      oldState: t
    }))) {
      this.hide();
      return;
    }
    (o = this.tippy) === null || o === void 0 || o.setProps({
      getReferenceClientRect: ((s = this.tippyOptions) === null || s === void 0 ? void 0 : s.getReferenceClientRect) || (() => em(e, c, u))
    }), this.show();
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Em = (n) => new be({
  key: typeof n.pluginKey == "string" ? new Pe(n.pluginKey) : n.pluginKey,
  view: (e) => new Yx({ view: e, ...n })
});
ye.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Em({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
const Xx = fe({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      type: [String, Object],
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    updateDelay: {
      type: Number,
      default: void 0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = H(null);
    return Et(() => {
      const { updateDelay: r, editor: o, pluginKey: s, shouldShow: i, tippyOptions: a } = n;
      o.registerPlugin(Cm({
        updateDelay: r,
        editor: o,
        element: t.value,
        pluginKey: s,
        shouldShow: i,
        tippyOptions: a
      }));
    }), Ti(() => {
      const { pluginKey: r, editor: o } = n;
      o.unregisterPlugin(r);
    }), () => {
      var r;
      return he("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
function Jd(n) {
  return b0((e, t) => ({
    get() {
      return e(), n;
    },
    set(r) {
      n = r, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          t();
        });
      });
    }
  }));
}
class Qx extends m1 {
  constructor(e = {}) {
    return super(e), this.vueRenderers = Oi(/* @__PURE__ */ new Map()), this.contentComponent = null, this.reactiveState = Jd(this.view.state), this.reactiveExtensionStorage = Jd(this.extensionStorage), this.on("transaction", () => {
      this.reactiveState.value = this.view.state, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), _p(this);
  }
  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state;
  }
  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
  }
  /**
   * Register a ProseMirror plugin.
   */
  registerPlugin(e, t) {
    super.registerPlugin(e, t), this.reactiveState.value = this.view.state;
  }
  /**
   * Unregister a ProseMirror plugin.
   */
  unregisterPlugin(e) {
    super.unregisterPlugin(e), this.reactiveState.value = this.view.state;
  }
}
const ew = fe({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(n) {
    const e = H(), t = Mp();
    return He(() => {
      const r = n.editor;
      r && r.options.element && e.value && fc(() => {
        if (!e.value || !r.options.element.firstChild)
          return;
        const o = ue(e.value);
        e.value.append(...r.options.element.childNodes), r.contentComponent = t.ctx._, r.setOptions({
          element: o
        }), r.createNodeViews();
      });
    }), Ti(() => {
      const r = n.editor;
      if (!r || (r.isDestroyed || r.view.setProps({
        nodeViews: {}
      }), r.contentComponent = null, !r.options.element.firstChild))
        return;
      const o = document.createElement("div");
      o.append(...r.options.element.childNodes), r.setOptions({
        element: o
      });
    }), { rootEl: e };
  },
  render() {
    const n = [];
    return this.editor && this.editor.vueRenderers.forEach((e) => {
      const t = he(Dp, {
        to: e.teleportElement,
        key: e.id
      }, he(e.component, {
        ref: e.id,
        ...e.props
      }));
      n.push(t);
    }), he("div", {
      ref: (e) => {
        this.rootEl = e;
      }
    }, ...n);
  }
});
fe({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<FloatingMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = H(null);
    return Et(() => {
      const { pluginKey: r, editor: o, tippyOptions: s, shouldShow: i } = n;
      o.registerPlugin(Em({
        pluginKey: r,
        editor: o,
        element: t.value,
        tippyOptions: s,
        shouldShow: i
      }));
    }), Ti(() => {
      const { pluginKey: r, editor: o } = n;
      o.unregisterPlugin(r);
    }), () => {
      var r;
      return he("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
fe({
  name: "NodeViewContent",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return he(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
});
fe({
  name: "NodeViewWrapper",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var n, e;
    return he(this.as, {
      // @ts-ignore
      class: this.decorationClasses,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      // @ts-ignore (https://github.com/vuejs/vue-next/issues/3031)
      onDragstart: this.onDragStart
    }, (e = (n = this.$slots).default) === null || e === void 0 ? void 0 : e.call(n));
  }
});
const tw = (n = {}) => {
  const e = pc();
  return Et(() => {
    e.value = new Qx(n);
  }), Ti(() => {
    var t;
    (t = e.value) === null || t === void 0 || t.destroy();
  }), e;
};
class nw {
  constructor(e, { props: t = {}, editor: r }) {
    if (this.id = Math.floor(Math.random() * 4294967295).toString(), this.editor = r, this.component = _p(e), this.teleportElement = document.createElement("div"), this.element = this.teleportElement, this.props = Oi(t), this.editor.vueRenderers.set(this.id, this), this.editor.contentComponent) {
      if (this.editor.contentComponent.update(), this.teleportElement.children.length !== 1)
        throw Error("VueRenderer doesn’t support multiple child elements.");
      this.element = this.teleportElement.firstElementChild;
    }
  }
  get ref() {
    var e;
    return (e = this.editor.contentComponent) === null || e === void 0 ? void 0 : e.refs[this.id];
  }
  updateProps(e = {}) {
    Object.entries(e).forEach(([t, r]) => {
      this.props[t] = r;
    });
  }
  destroy() {
    this.editor.vueRenderers.delete(this.id);
  }
}
function rw(n) {
  return v0() ? (k0(n), !0) : !1;
}
function zo(n) {
  return typeof n == "function" ? n() : ue(n);
}
const ow = typeof window < "u" && typeof document < "u", sw = Object.prototype.toString, iw = (n) => sw.call(n) === "[object Object]", Bl = () => {
};
function Am(n, e) {
  function t(...r) {
    return new Promise((o, s) => {
      Promise.resolve(n(() => e.apply(this, r), { fn: e, thisArg: this, args: r })).then(o).catch(s);
    });
  }
  return t;
}
const Tm = (n) => n();
function aw(n, e = {}) {
  let t, r, o = Bl;
  const s = (a) => {
    clearTimeout(a), o(), o = Bl;
  };
  return (a) => {
    const l = zo(n), c = zo(e.maxWait);
    return t && s(t), l <= 0 || c !== void 0 && c <= 0 ? (r && (s(r), r = null), Promise.resolve(a())) : new Promise((u, d) => {
      o = e.rejectOnCancel ? d : u, c && !r && (r = setTimeout(() => {
        t && s(t), r = null, u(a());
      }, c)), t = setTimeout(() => {
        r && s(r), r = null, u(a());
      }, l);
    });
  };
}
function lw(n = Tm) {
  const e = H(!0);
  function t() {
    e.value = !1;
  }
  function r() {
    e.value = !0;
  }
  const o = (...s) => {
    e.value && n(...s);
  };
  return { isActive: x0(e), pause: t, resume: r, eventFilter: o };
}
function cw(n, e = 200, t = {}) {
  return Am(
    aw(e, t),
    n
  );
}
function uw(n, e, t = {}) {
  const {
    eventFilter: r = Tm,
    ...o
  } = t;
  return Xn(
    n,
    Am(
      r,
      e
    ),
    o
  );
}
function dw(n, e, t = {}) {
  const {
    eventFilter: r,
    ...o
  } = t, { eventFilter: s, pause: i, resume: a, isActive: l } = lw(r);
  return { stop: uw(
    n,
    e,
    {
      ...o,
      eventFilter: s
    }
  ), pause: i, resume: a, isActive: l };
}
function fw(n) {
  var e;
  const t = zo(n);
  return (e = t == null ? void 0 : t.$el) != null ? e : t;
}
const Fl = ow ? window : void 0;
function Gd(...n) {
  let e, t, r, o;
  if (typeof n[0] == "string" || Array.isArray(n[0]) ? ([t, r, o] = n, e = Fl) : [e, t, r, o] = n, !e)
    return Bl;
  Array.isArray(t) || (t = [t]), Array.isArray(r) || (r = [r]);
  const s = [], i = () => {
    s.forEach((u) => u()), s.length = 0;
  }, a = (u, d, f, p) => (u.addEventListener(d, f, p), () => u.removeEventListener(d, f, p)), l = Xn(
    () => [fw(e), zo(o)],
    ([u, d]) => {
      if (i(), !u)
        return;
      const f = iw(d) ? { ...d } : d;
      s.push(
        ...t.flatMap((p) => r.map((h) => a(u, p, h, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    l(), i();
  };
  return rw(c), c;
}
const vs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ks = "__vueuse_ssr_handlers__", pw = /* @__PURE__ */ hw();
function hw() {
  return ks in vs || (vs[ks] = vs[ks] || {}), vs[ks];
}
function mw(n, e) {
  return pw[n] || e;
}
function gw(n) {
  return n == null ? "any" : n instanceof Set ? "set" : n instanceof Map ? "map" : n instanceof Date ? "date" : typeof n == "boolean" ? "boolean" : typeof n == "string" ? "string" : typeof n == "object" ? "object" : Number.isNaN(n) ? "any" : "number";
}
const yw = {
  boolean: {
    read: (n) => n === "true",
    write: (n) => String(n)
  },
  object: {
    read: (n) => JSON.parse(n),
    write: (n) => JSON.stringify(n)
  },
  number: {
    read: (n) => Number.parseFloat(n),
    write: (n) => String(n)
  },
  any: {
    read: (n) => n,
    write: (n) => String(n)
  },
  string: {
    read: (n) => n,
    write: (n) => String(n)
  },
  map: {
    read: (n) => new Map(JSON.parse(n)),
    write: (n) => JSON.stringify(Array.from(n.entries()))
  },
  set: {
    read: (n) => new Set(JSON.parse(n)),
    write: (n) => JSON.stringify(Array.from(n))
  },
  date: {
    read: (n) => new Date(n),
    write: (n) => n.toISOString()
  }
}, Zd = "vueuse-storage";
function ql(n, e, t, r = {}) {
  var o;
  const {
    flush: s = "pre",
    deep: i = !0,
    listenToStorageChanges: a = !0,
    writeDefaults: l = !0,
    mergeDefaults: c = !1,
    shallow: u,
    window: d = Fl,
    eventFilter: f,
    onError: p = (E) => {
      console.error(E);
    }
  } = r, h = (u ? pc : H)(e);
  if (!t)
    try {
      t = mw("getDefaultStorage", () => {
        var E;
        return (E = Fl) == null ? void 0 : E.localStorage;
      })();
    } catch (E) {
      p(E);
    }
  if (!t)
    return h;
  const m = zo(e), g = gw(m), b = (o = r.serializer) != null ? o : yw[g], { pause: v, resume: x } = dw(
    h,
    () => y(h.value),
    { flush: s, deep: i, eventFilter: f }
  );
  return d && a && (Gd(d, "storage", S), Gd(d, Zd, k)), S(), h;
  function y(E) {
    try {
      if (E == null)
        t.removeItem(n);
      else {
        const T = b.write(E), D = t.getItem(n);
        D !== T && (t.setItem(n, T), d && d.dispatchEvent(new CustomEvent(Zd, {
          detail: {
            key: n,
            oldValue: D,
            newValue: T,
            storageArea: t
          }
        })));
      }
    } catch (T) {
      p(T);
    }
  }
  function w(E) {
    const T = E ? E.newValue : t.getItem(n);
    if (T == null)
      return l && m !== null && t.setItem(n, b.write(m)), m;
    if (!E && c) {
      const D = b.read(T);
      return typeof c == "function" ? c(D, m) : g === "object" && !Array.isArray(D) ? { ...m, ...D } : D;
    } else
      return typeof T != "string" ? T : b.read(T);
  }
  function k(E) {
    S(E.detail);
  }
  function S(E) {
    if (!(E && E.storageArea !== t)) {
      if (E && E.key == null) {
        h.value = m;
        return;
      }
      if (!(E && E.key !== n)) {
        v();
        try {
          (E == null ? void 0 : E.newValue) !== b.write(h.value) && (h.value = w(E));
        } catch (T) {
          p(T);
        } finally {
          E ? fc(x) : x();
        }
      }
    }
  }
}
var Pa = /* @__PURE__ */ new WeakMap(), Yd = 0;
function bw(n) {
  if (!n.length)
    return "";
  for (var e = "arg", t = 0; t < n.length; ++t) {
    var r = void 0;
    n[t] === null || typeof n[t] != "object" && typeof n[t] != "function" ? typeof n[t] == "string" ? r = '"' + n[t] + '"' : r = String(n[t]) : Pa.has(n[t]) ? r = Pa.get(n[t]) : (r = Yd, Pa.set(n[t], Yd++)), e += "@" + r;
  }
  return e;
}
function vw(n) {
  if (typeof n == "function")
    try {
      n = n();
    } catch {
      n = "";
    }
  return Array.isArray(n) ? n = bw(n) : n = String(n || ""), n;
}
var Vc = (
  /** @class */
  function() {
    function n(e) {
      e === void 0 && (e = 0), this.items = /* @__PURE__ */ new Map(), this.ttl = e;
    }
    return n.prototype.serializeKey = function(e) {
      return vw(e);
    }, n.prototype.get = function(e) {
      var t = this.serializeKey(e);
      return this.items.get(t);
    }, n.prototype.set = function(e, t, r) {
      var o = this.serializeKey(e), s = r || this.ttl, i = Date.now(), a = {
        data: t,
        createdAt: i,
        expiresAt: s ? i + s : 1 / 0
      };
      this.dispatchExpire(s, a, o), this.items.set(o, a);
    }, n.prototype.dispatchExpire = function(e, t, r) {
      var o = this;
      e && setTimeout(function() {
        var s = Date.now(), i = s >= t.expiresAt;
        i && o.delete(r);
      }, e);
    }, n.prototype.delete = function(e) {
      this.items.delete(e);
    }, n;
  }()
);
function kw() {
  return typeof navigator.onLine < "u" ? navigator.onLine : !0;
}
function xw() {
  return typeof document < "u" && typeof document.visibilityState < "u" ? document.visibilityState !== "hidden" : !0;
}
var ww = function(n) {
  return fetch(n).then(function(e) {
    return e.json();
  });
};
const Ia = {
  isOnline: kw,
  isDocumentVisible: xw,
  fetcher: ww
};
var Zt = globalThis && globalThis.__assign || function() {
  return Zt = Object.assign || function(n) {
    for (var e, t = 1, r = arguments.length; t < r; t++) {
      e = arguments[t];
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    }
    return n;
  }, Zt.apply(this, arguments);
}, Er = globalThis && globalThis.__awaiter || function(n, e, t, r) {
  function o(s) {
    return s instanceof t ? s : new t(function(i) {
      i(s);
    });
  }
  return new (t || (t = Promise))(function(s, i) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        i(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        i(d);
      }
    }
    function c(u) {
      u.done ? s(u.value) : o(u.value).then(a, l);
    }
    c((r = r.apply(n, e || [])).next());
  });
}, Ar = globalThis && globalThis.__generator || function(n, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, o, s, i;
  return i = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (i[Symbol.iterator] = function() {
    return this;
  }), i;
  function a(c) {
    return function(u) {
      return l([c, u]);
    };
  }
  function l(c) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (r = 1, o && (s = c[0] & 2 ? o.return : c[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, c[1])).done)
          return s;
        switch (o = 0, s && (c = [c[0] & 2, s.value]), c[0]) {
          case 0:
          case 1:
            s = c;
            break;
          case 4:
            return t.label++, { value: c[1], done: !1 };
          case 5:
            t.label++, o = c[1], c = [0];
            continue;
          case 7:
            c = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              t = 0;
              continue;
            }
            if (c[0] === 3 && (!s || c[1] > s[0] && c[1] < s[3])) {
              t.label = c[1];
              break;
            }
            if (c[0] === 6 && t.label < s[1]) {
              t.label = s[1], s = c;
              break;
            }
            if (s && t.label < s[2]) {
              t.label = s[2], t.ops.push(c);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        c = e.call(n, t);
      } catch (u) {
        c = [6, u], o = 0;
      } finally {
        r = s = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}, Sw = globalThis && globalThis.__read || function(n, e) {
  var t = typeof Symbol == "function" && n[Symbol.iterator];
  if (!t)
    return n;
  var r = t.call(n), o, s = [], i;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = r.next()).done; )
      s.push(o.value);
  } catch (a) {
    i = { error: a };
  } finally {
    try {
      o && !o.done && (t = r.return) && t.call(r);
    } finally {
      if (i)
        throw i.error;
    }
  }
  return s;
}, Cw = globalThis && globalThis.__spreadArray || function(n, e, t) {
  if (t || arguments.length === 2)
    for (var r = 0, o = e.length, s; r < o; r++)
      (s || !(r in e)) && (s || (s = Array.prototype.slice.call(e, 0, r)), s[r] = e[r]);
  return n.concat(s || Array.prototype.slice.call(e));
}, Om = new Vc(), ei = new Vc(), Ba = new Vc(), Mm = {
  cache: Om,
  refreshInterval: 0,
  ttl: 0,
  serverTTL: 1e3,
  dedupingInterval: 2e3,
  revalidateOnFocus: !0,
  revalidateDebounce: 0,
  shouldRetryOnError: !0,
  errorRetryInterval: 5e3,
  errorRetryCount: 5,
  fetcher: Ia.fetcher,
  isOnline: Ia.isOnline,
  isDocumentVisible: Ia.isDocumentVisible
};
function Ew(n, e, t) {
  var r = ei.get(n);
  if (r)
    r.data.push(e);
  else {
    var o = 5e3;
    ei.set(n, [e], t > 0 ? t + o : t);
  }
}
function Aw(n, e, t) {
  if (t.isDocumentVisible() && !(t.errorRetryCount !== void 0 && e > t.errorRetryCount)) {
    var r = Math.min(e || 0, t.errorRetryCount), o = r * t.errorRetryInterval;
    setTimeout(function() {
      n(null, { errorRetryCount: r + 1, shouldRetryOnError: !0 });
    }, o);
  }
}
var Xd = function(n, e, t, r) {
  return t === void 0 && (t = Om), r === void 0 && (r = Mm.ttl), Er(void 0, void 0, void 0, function() {
    var o, s, i, a, l, c, u;
    return Ar(this, function(d) {
      switch (d.label) {
        case 0:
          if (!Tw(e))
            return [3, 5];
          d.label = 1;
        case 1:
          return d.trys.push([1, 3, , 4]), [4, e];
        case 2:
          return o = d.sent(), [3, 4];
        case 3:
          return a = d.sent(), s = a, [3, 4];
        case 4:
          return [3, 6];
        case 5:
          o = e, d.label = 6;
        case 6:
          if (i = !1, l = { data: o, error: s, isValidating: i }, typeof o < "u")
            try {
              t.set(n, l, r);
            } catch (f) {
              console.error("swrv(mutate): failed to set cache", f);
            }
          return c = ei.get(n), c && c.data.length && (u = c.data.filter(function(f) {
            return f.key === n;
          }), u.forEach(function(f, p) {
            typeof l.data < "u" && (f.data = l.data), f.error = l.error, f.isValidating = l.isValidating;
            var h = p === u.length - 1;
            h || delete u[p];
          }), u = u.filter(Boolean)), [2, l];
      }
    });
  });
};
function Qd() {
  for (var n = this, e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  var r, o, s = Zt({}, Mm), i = !1, a = !1, l = Mp(), c = (l == null ? void 0 : l.proxy) || l;
  if (!c)
    return console.error("Could not get current instance, check to make sure that `useSwrv` is declared in the top level of the setup function."), null;
  var u = (c == null ? void 0 : c.$isServer) || !1;
  e.length >= 1 && (r = e[0]), e.length >= 2 && (o = e[1]), e.length > 2 && (s = Zt(Zt({}, s), e[2]));
  var d = u ? s.serverTTL : s.ttl, f = typeof r == "function" ? r : H(r);
  typeof o > "u" && (o = s.fetcher);
  var p = null;
  p || (p = Oi({
    data: void 0,
    error: void 0,
    isValidating: !0,
    key: null
  }));
  var h = function(v, x) {
    return Er(n, void 0, void 0, function() {
      var y, w, k, S, E, T, D, N = this;
      return Ar(this, function(z) {
        switch (z.label) {
          case 0:
            return y = p.data === void 0, w = f.value, w ? (k = s.cache.get(w), S = k && k.data, p.isValidating = !0, S && (p.data = S.data, p.error = S.error), E = v || o, !E || !s.isDocumentVisible() && !y || (x == null ? void 0 : x.forceRevalidate) !== void 0 && !(x != null && x.forceRevalidate) ? (p.isValidating = !1, [
              2
              /*return*/
            ]) : k && (T = !!(Date.now() - k.createdAt >= s.dedupingInterval || x != null && x.forceRevalidate), !T) ? (p.isValidating = !1, [
              2
              /*return*/
            ]) : (D = function() {
              return Er(N, void 0, void 0, function() {
                var I, O, F, L;
                return Ar(this, function($) {
                  switch ($.label) {
                    case 0:
                      return I = Ba.get(w), I ? [3, 2] : (O = Array.isArray(w) ? w : [w], F = E.apply(void 0, Cw([], Sw(O), !1)), Ba.set(w, F, s.dedupingInterval), [4, Xd(w, F, s.cache, d)]);
                    case 1:
                      return $.sent(), [3, 4];
                    case 2:
                      return [4, Xd(w, I.data, s.cache, d)];
                    case 3:
                      $.sent(), $.label = 4;
                    case 4:
                      return p.isValidating = !1, Ba.delete(w), p.error !== void 0 && (L = !i && s.shouldRetryOnError && (x ? x.shouldRetryOnError : !0), L && Aw(h, x ? x.errorRetryCount : 1, s)), [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, S && s.revalidateDebounce ? (setTimeout(function() {
              return Er(N, void 0, void 0, function() {
                return Ar(this, function(I) {
                  switch (I.label) {
                    case 0:
                      return i ? [3, 2] : [4, D()];
                    case 1:
                      I.sent(), I.label = 2;
                    case 2:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, s.revalidateDebounce), [3, 3]) : [3, 1])) : [
              2
              /*return*/
            ];
          case 1:
            return [4, D()];
          case 2:
            z.sent(), z.label = 3;
          case 3:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, m = function() {
    return Er(n, void 0, void 0, function() {
      return Ar(this, function(v) {
        return [2, h(null, { shouldRetryOnError: !1 })];
      });
    });
  }, g = null;
  Et(function() {
    var v = function() {
      return Er(n, void 0, void 0, function() {
        return Ar(this, function(x) {
          switch (x.label) {
            case 0:
              return !p.error && s.isOnline() ? [4, h()] : [3, 2];
            case 1:
              return x.sent(), [3, 3];
            case 2:
              g && clearTimeout(g), x.label = 3;
            case 3:
              return s.refreshInterval && !i && (g = setTimeout(v, s.refreshInterval)), [
                2
                /*return*/
              ];
          }
        });
      });
    };
    s.refreshInterval && (g = setTimeout(v, s.refreshInterval)), s.revalidateOnFocus && (document.addEventListener("visibilitychange", m, !1), window.addEventListener("focus", m, !1));
  }), Qn(function() {
    i = !0, g && clearTimeout(g), s.revalidateOnFocus && (document.removeEventListener("visibilitychange", m, !1), window.removeEventListener("focus", m, !1));
    var v = ei.get(f.value);
    v && (v.data = v.data.filter(function(x) {
      return x !== p;
    }));
  });
  try {
    Xn(f, function(v) {
      w0(f) || (f.value = v), p.key = v, p.isValidating = !!v, Ew(f.value, p, d), !u && !a && f.value && h(), a = !1;
    }, {
      immediate: !0
    });
  } catch {
  }
  var b = Zt(Zt({}, S0(p)), { mutate: function(v, x) {
    return h(v, Zt(Zt({}, x), { forceRevalidate: !0 }));
  } });
  return b;
}
function Tw(n) {
  return n !== null && typeof n == "object" && typeof n.then == "function";
}
function Ow(n) {
  const e = new TextDecoder();
  return n ? function(t) {
    return e.decode(t, { stream: !0 }).split(`
`).map(Mw).filter(Boolean);
  } : function(t) {
    return t ? e.decode(t, { stream: !0 }) : "";
  };
}
var ef = {
  text: 0,
  function_call: 1,
  data: 2
  // user_err: 3?
}, Mw = (n) => {
  const e = n.indexOf(":"), t = n.slice(0, e), r = Object.keys(ef).find(
    (i) => ef[i] === Number(t)
  ), o = n.slice(e + 1);
  let s = o;
  if (!o)
    return { type: r, value: "" };
  try {
    s = JSON.parse(o);
  } catch {
    console.error("Failed to parse JSON value:", o);
  }
  return { type: r, value: s };
}, Dw = 0, tf = Qd.default || Qd, nf = {};
function Dm({
  api: n = "/api/completion",
  id: e,
  initialCompletion: t = "",
  initialInput: r = "",
  credentials: o,
  headers: s,
  body: i,
  onResponse: a,
  onFinish: l,
  onError: c
} = {}) {
  var u;
  const d = e || `completion-${Dw++}`, f = `${n}|${d}`, { data: p, mutate: h } = tf(
    f,
    () => nf[f] || t
  ), { data: m, mutate: g } = tf(
    `${d}-loading`,
    null
  );
  (u = m.value) != null || (m.value = !1), p.value || (p.value = t);
  const b = (N) => (nf[f] = N, h()), v = p, x = H(void 0);
  let y = null;
  async function w(N, z) {
    try {
      g(() => !0), y = new AbortController(), b("");
      const I = await fetch(n, {
        method: "POST",
        body: JSON.stringify({
          prompt: N,
          ...i,
          ...z == null ? void 0 : z.body
        }),
        headers: {
          ...s,
          ...z == null ? void 0 : z.headers
        },
        signal: y.signal,
        credentials: o
      }).catch(($) => {
        throw $;
      });
      if (a)
        try {
          await a(I);
        } catch ($) {
          throw $;
        }
      if (!I.ok)
        throw new Error(
          await I.text() || "Failed to fetch the chat response."
        );
      if (!I.body)
        throw new Error("The response body is empty.");
      let O = "";
      const F = I.body.getReader(), L = Ow();
      for (; ; ) {
        const { done: $, value: ee } = await F.read();
        if ($)
          break;
        if (O += L(ee), b(O), y === null) {
          F.cancel();
          break;
        }
      }
      return l && l(N, O), y = null, O;
    } catch (I) {
      if (I.name === "AbortError")
        return y = null, null;
      c && x instanceof Error && c(x), x.value = I;
    } finally {
      g(() => !1);
    }
  }
  const k = async (N, z) => w(N, z), S = () => {
    y && (y.abort(), y = null);
  }, E = (N) => {
    b(N);
  }, T = H(r);
  return {
    completion: v,
    complete: k,
    error: x,
    stop: S,
    setCompletion: E,
    input: T,
    handleSubmit: (N) => {
      N.preventDefault();
      const z = T.value;
      if (z)
        return k(z);
    },
    isLoading: m
  };
}
const _w = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Introducing Novel" }]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/steven-tey/novel",
                target: "_blank",
                class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
              }
            }
          ],
          text: "Novel"
        },
        {
          type: "text",
          text: " is a Notion-style WYSIWYG editor with AI-powered autocompletion. Built with "
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
                class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
              }
            }
          ],
          text: "Tiptap"
        },
        { type: "text", text: " + " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://sdk.vercel.ai/docs",
                target: "_blank",
                class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
              }
            }
          ],
          text: "Vercel AI SDK"
        },
        { type: "text", text: "." }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Installation" }]
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [{ type: "text", text: "npm i novel" }]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Usage" }]
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: `import { Editor } from "novel";

export default function App() {
  return (
     <Editor />
  )
}`
        }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Features" }]
    },
    {
      type: "orderedList",
      attrs: { tight: !0, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Slash menu & bubble menu" }]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "AI autocomplete (type " },
                { type: "text", marks: [{ type: "code" }], text: "++" },
                {
                  type: "text",
                  text: " to activate, or select from slash menu)"
                }
              ]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Image uploads (drag & drop / copy & paste, or select from slash menu) "
                }
              ]
            }
          ]
        }
      ]
    },
    // {
    //   type: "image",
    //   attrs: {
    //     src: "https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png",
    //     alt: "banner.png",
    //     title: "banner.png",
    //     width: null,
    //     height: null,
    //   },
    // },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Learn more" }]
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: !1 },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Star us on " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://github.com/steven-tey/novel",
                        target: "_blank",
                        class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                      }
                    }
                  ],
                  text: "GitHub"
                }
              ]
            }
          ]
        },
        {
          type: "taskItem",
          attrs: { checked: !1 },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Install the " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://www.npmjs.com/package/novel",
                        target: "_blank",
                        class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                      }
                    }
                  ],
                  text: "NPM package"
                }
              ]
            }
          ]
        },
        {
          type: "taskItem",
          attrs: { checked: !1 },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://vercel.com/templates/next.js/novel",
                        target: "_blank",
                        class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                      }
                    }
                  ],
                  text: "Deploy your own"
                },
                { type: "text", text: " to Vercel" }
              ]
            }
          ]
        }
      ]
    }
  ]
}, Nw = /^\s*>\s$/, Rw = se.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["blockquote", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: n }) => n.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: n }) => n.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: n }) => n.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      Ur({
        find: Nw,
        type: this.type
      })
    ];
  }
}), Lw = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))$/, Pw = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))/g, Iw = /(?:^|\s)((?:__)((?:[^__]+))(?:__))$/, Bw = /(?:^|\s)((?:__)((?:[^__]+))(?:__))/g, Fw = ke.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["strong", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      ir({
        find: Lw,
        type: this.type
      }),
      ir({
        find: Iw,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      ar({
        find: Pw,
        type: this.type
      }),
      ar({
        find: Bw,
        type: this.type
      })
    ];
  }
}), qw = se.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", de(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), rf = ke.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = Go(n, this.type);
        return Object.entries(t).some(([, o]) => !!o) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), of = /^\s*([-+*])\s$/, zw = se.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(qw.name, this.editor.getAttributes(rf.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = Ur({
      find: of,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Ur({
      find: of,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(rf.name),
      editor: this.editor
    })), [
      n
    ];
  }
}), $w = /(?:^|\s)((?:`)((?:[^`]+))(?:`))$/, Hw = /(?:^|\s)((?:`)((?:[^`]+))(?:`))/g, jw = ke.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["code", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands: n }) => n.setMark(this.name),
      toggleCode: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetCode: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      ir({
        find: $w,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      ar({
        find: Hw,
        type: this.type
      })
    ];
  }
}), Vw = /^```([a-z]+)?[\s\n]$/, Uw = /^~~~([a-z]+)?[\s\n]$/, Ww = se.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: (n) => {
          var e;
          const { languageClassPrefix: t } = this.options, s = [...((e = n.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((i) => i.startsWith(t)).map((i) => i.replace(t, ""))[0];
          return s || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "pre",
      de(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: n.attrs.language ? this.options.languageClassPrefix + n.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (n) => ({ commands: e }) => e.setNode(this.name, n),
      toggleCodeBlock: (n) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", n)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: n, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !n || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // exit node on triple enter
      Enter: ({ editor: n }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: o } = t;
        if (!o || r.parent.type !== this.type)
          return !1;
        const s = r.parentOffset === r.parent.nodeSize - 2, i = r.parent.textContent.endsWith(`

`);
        return !s || !i ? !1 : n.chain().command(({ tr: a }) => (a.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: n }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = n, { selection: t, doc: r } = e, { $from: o, empty: s } = t;
        if (!s || o.parent.type !== this.type || !(o.parentOffset === o.parent.nodeSize - 2))
          return !1;
        const a = o.after();
        return a === void 0 || r.nodeAt(a) ? !1 : n.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      Dl({
        find: Vw,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      }),
      Dl({
        find: Uw,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new be({
        key: new Pe("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (n, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), o = r ? JSON.parse(r) : void 0, s = o == null ? void 0 : o.mode;
            if (!t || !s)
              return !1;
            const { tr: i } = n.state;
            return i.replaceSelectionWith(this.type.create({ language: s })), i.setSelection(G.near(i.doc.resolve(Math.max(0, i.selection.from - 2)))), i.insertText(t.replace(/\r\n?/g, `
`)), i.setMeta("paste", !0), n.dispatch(i), !0;
          }
        }
      })
    ];
  }
}), Kw = se.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
function Jw(n = {}) {
  return new be({
    view(e) {
      return new Gw(e, n);
    }
  });
}
class Gw {
  constructor(e, t) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = t.width) !== null && r !== void 0 ? r : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((o) => {
      let s = (i) => {
        this[o](i);
      };
      return e.dom.addEventListener(o, s), { name: o, handler: s };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, r;
    if (t) {
      let a = e.nodeBefore, l = e.nodeAfter;
      if (a || l) {
        let c = this.editorView.nodeDOM(this.cursorPos - (a ? a.nodeSize : 0));
        if (c) {
          let u = c.getBoundingClientRect(), d = a ? u.bottom : u.top;
          a && l && (d = (d + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2), r = { left: u.left, right: u.right, top: d - this.width / 2, bottom: d + this.width / 2 };
        }
      }
    }
    if (!r) {
      let a = this.editorView.coordsAtPos(this.cursorPos);
      r = { left: a.left - this.width / 2, right: a.left + this.width / 2, top: a.top, bottom: a.bottom };
    }
    let o = this.editorView.dom.offsetParent;
    this.element || (this.element = o.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let s, i;
    if (!o || o == document.body && getComputedStyle(o).position == "static")
      s = -pageXOffset, i = -pageYOffset;
    else {
      let a = o.getBoundingClientRect();
      s = a.left - o.scrollLeft, i = a.top - o.scrollTop;
    }
    this.element.style.left = r.left - s + "px", this.element.style.top = r.top - i + "px", this.element.style.width = r.right - r.left + "px", this.element.style.height = r.bottom - r.top + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), o = r && r.type.spec.disableDropCursor, s = typeof o == "function" ? o(this.editorView, t, e) : o;
    if (t && !s) {
      let i = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let a = th(this.editorView.state.doc, i, this.editorView.dragging.slice);
        a != null && (i = a);
      }
      this.setCursor(i), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    (e.target == this.editorView.dom || !this.editorView.dom.contains(e.relatedTarget)) && this.setCursor(null);
  }
}
const Zw = ye.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      Jw(this.options)
    ];
  }
});
class ge extends X {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return ge.valid(r) ? new ge(r) : X.near(r);
  }
  content() {
    return R.empty;
  }
  eq(e) {
    return e instanceof ge && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new ge(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new Uc(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !Yw(e) || !Xw(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let o = t.contentMatchAt(e.index()).defaultType;
    return o && o.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, r = !1) {
    e:
      for (; ; ) {
        if (!r && ge.valid(e))
          return e;
        let o = e.pos, s = null;
        for (let i = e.depth; ; i--) {
          let a = e.node(i);
          if (t > 0 ? e.indexAfter(i) < a.childCount : e.index(i) > 0) {
            s = a.child(t > 0 ? e.indexAfter(i) : e.index(i) - 1);
            break;
          } else if (i == 0)
            return null;
          o += t;
          let l = e.doc.resolve(o);
          if (ge.valid(l))
            return l;
        }
        for (; ; ) {
          let i = t > 0 ? s.firstChild : s.lastChild;
          if (!i) {
            if (s.isAtom && !s.isText && !j.isSelectable(s)) {
              e = e.doc.resolve(o + s.nodeSize * t), r = !1;
              continue e;
            }
            break;
          }
          s = i, o += t;
          let a = e.doc.resolve(o);
          if (ge.valid(a))
            return a;
        }
        return null;
      }
  }
}
ge.prototype.visible = !1;
ge.findFrom = ge.findGapCursorFrom;
X.jsonID("gapcursor", ge);
class Uc {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Uc(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return ge.valid(t) ? new ge(t) : X.near(t);
  }
}
function Yw(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let o = r.child(t - 1); ; o = o.lastChild) {
      if (o.childCount == 0 && !o.inlineContent || o.isAtom || o.type.spec.isolating)
        return !0;
      if (o.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Xw(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let o = r.child(t); ; o = o.firstChild) {
      if (o.childCount == 0 && !o.inlineContent || o.isAtom || o.type.spec.isolating)
        return !0;
      if (o.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Qw() {
  return new be({
    props: {
      decorations: rS,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && ge.valid(t) ? new ge(t) : null;
      },
      handleClick: tS,
      handleKeyDown: eS,
      handleDOMEvents: { beforeinput: nS }
    }
  });
}
const eS = $h({
  ArrowLeft: xs("horiz", -1),
  ArrowRight: xs("horiz", 1),
  ArrowUp: xs("vert", -1),
  ArrowDown: xs("vert", 1)
});
function xs(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, o, s) {
    let i = r.selection, a = e > 0 ? i.$to : i.$from, l = i.empty;
    if (i instanceof G) {
      if (!s.endOfTextblock(t) || a.depth == 0)
        return !1;
      l = !1, a = r.doc.resolve(e > 0 ? a.after() : a.before());
    }
    let c = ge.findGapCursorFrom(a, e, l);
    return c ? (o && o(r.tr.setSelection(new ge(c))), !0) : !1;
  };
}
function tS(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!ge.valid(r))
    return !1;
  let o = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return o && o.inside > -1 && j.isSelectable(n.state.doc.nodeAt(o.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new ge(r))), !0);
}
function nS(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof ge))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let o = M.empty;
  for (let i = r.length - 1; i >= 0; i--)
    o = M.from(r[i].createAndFill(null, o));
  let s = n.state.tr.replace(t.pos, t.pos, new R(o, 0, 0));
  return s.setSelection(G.near(s.doc.resolve(t.pos + 1))), n.dispatch(s), !1;
}
function rS(n) {
  if (!(n.selection instanceof ge))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", me.create(n.doc, [$e.widget(n.selection.head, e, { key: "gapcursor" })]);
}
const oS = ye.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      Qw()
    ];
  },
  extendNodeSchema(n) {
    var e;
    const t = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      allowGapCursor: (e = Y(P(n, "allowGapCursor", t))) !== null && e !== void 0 ? e : null
    };
  }
}), sS = se.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", de(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: o, storedMarks: s } = t;
          if (o.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: i } = this.options, { splittableMarks: a } = r.extensionManager, l = s || o.$to.parentOffset && o.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
            if (u && l && i) {
              const d = l.filter((f) => a.includes(f.type.name));
              c.ensureMarks(d);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), iS = se.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, de(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((n, e) => ({
      ...n,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((n) => Dl({
      find: new RegExp(`^(#{1,${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
});
var ti = 200, Me = function() {
};
Me.prototype.append = function(e) {
  return e.length ? (e = Me.from(e), !this.length && e || e.length < ti && this.leafAppend(e) || this.length < ti && e.leafPrepend(this) || this.appendInner(e)) : this;
};
Me.prototype.prepend = function(e) {
  return e.length ? Me.from(e).append(this) : this;
};
Me.prototype.appendInner = function(e) {
  return new aS(this, e);
};
Me.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? Me.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
Me.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
Me.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
Me.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var o = [];
  return this.forEach(function(s, i) {
    return o.push(e(s, i));
  }, t, r), o;
};
Me.from = function(e) {
  return e instanceof Me ? e : e && e.length ? new _m(e) : Me.empty;
};
var _m = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(o, s) {
    return o == 0 && s == this.length ? this : new e(this.values.slice(o, s));
  }, e.prototype.getInner = function(o) {
    return this.values[o];
  }, e.prototype.forEachInner = function(o, s, i, a) {
    for (var l = s; l < i; l++)
      if (o(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(o, s, i, a) {
    for (var l = s - 1; l >= i; l--)
      if (o(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.leafAppend = function(o) {
    if (this.length + o.length <= ti)
      return new e(this.values.concat(o.flatten()));
  }, e.prototype.leafPrepend = function(o) {
    if (this.length + o.length <= ti)
      return new e(o.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(Me);
Me.empty = new _m([]);
var aS = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, o, s, i) {
    var a = this.left.length;
    if (o < a && this.left.forEachInner(r, o, Math.min(s, a), i) === !1 || s > a && this.right.forEachInner(r, Math.max(o - a, 0), Math.min(this.length, s) - a, i + a) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, o, s, i) {
    var a = this.left.length;
    if (o > a && this.right.forEachInvertedInner(r, o - a, Math.max(s, a) - a, i + a) === !1 || s < a && this.left.forEachInvertedInner(r, Math.min(o, a), s, i) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, o) {
    if (r == 0 && o == this.length)
      return this;
    var s = this.left.length;
    return o <= s ? this.left.slice(r, o) : r >= s ? this.right.slice(r - s, o - s) : this.left.slice(r, s).append(this.right.slice(0, o - s));
  }, e.prototype.leafAppend = function(r) {
    var o = this.right.leafAppend(r);
    if (o)
      return new e(this.left, o);
  }, e.prototype.leafPrepend = function(r) {
    var o = this.left.leafPrepend(r);
    if (o)
      return new e(o, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(Me);
const lS = 500;
class wt {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let o, s;
    t && (o = this.remapping(r, this.items.length), s = o.maps.length);
    let i = e.tr, a, l, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        o || (o = this.remapping(r, f + 1), s = o.maps.length), s--, u.push(d);
        return;
      }
      if (o) {
        u.push(new Mt(d.map));
        let p = d.step.map(o.slice(s)), h;
        p && i.maybeStep(p).doc && (h = i.mapping.maps[i.mapping.maps.length - 1], c.push(new Mt(h, void 0, void 0, c.length + u.length))), s--, h && o.appendMap(h, s);
      } else
        i.maybeStep(d.step);
      if (d.selection)
        return a = o ? d.selection.map(o.slice(s)) : d.selection, l = new wt(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: l, transform: i, selection: a };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, o) {
    let s = [], i = this.eventCount, a = this.items, l = !o && a.length ? a.get(a.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new Mt(e.mapping.maps[u], d, t), p;
      (p = l && l.merge(f)) && (f = p, u ? s.pop() : a = a.slice(0, a.length - 1)), s.push(f), t && (i++, t = void 0), o || (l = f);
    }
    let c = i - r.depth;
    return c > uS && (a = cS(a, c), i -= c), new wt(a.append(s), i);
  }
  remapping(e, t) {
    let r = new Lr();
    return this.items.forEach((o, s) => {
      let i = o.mirrorOffset != null && s - o.mirrorOffset >= e ? r.maps.length - o.mirrorOffset : void 0;
      r.appendMap(o.map, i);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new wt(this.items.append(e.map((t) => new Mt(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], o = Math.max(0, this.items.length - t), s = e.mapping, i = e.steps.length, a = this.eventCount;
    this.items.forEach((f) => {
      f.selection && a--;
    }, o);
    let l = t;
    this.items.forEach((f) => {
      let p = s.getMirror(--l);
      if (p == null)
        return;
      i = Math.min(i, p);
      let h = s.maps[p];
      if (f.step) {
        let m = e.steps[p].invert(e.docs[p]), g = f.selection && f.selection.map(s.slice(l + 1, p));
        g && a++, r.push(new Mt(h, m, g));
      } else
        r.push(new Mt(h));
    }, o);
    let c = [];
    for (let f = t; f < i; f++)
      c.push(new Mt(s.maps[f]));
    let u = this.items.slice(0, o).append(c).append(r), d = new wt(u, a);
    return d.emptyItemCount() > lS && (d = d.compress(this.items.length - r.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, o = [], s = 0;
    return this.items.forEach((i, a) => {
      if (a >= e)
        o.push(i), i.selection && s++;
      else if (i.step) {
        let l = i.step.map(t.slice(r)), c = l && l.getMap();
        if (r--, c && t.appendMap(c, r), l) {
          let u = i.selection && i.selection.map(t.slice(r));
          u && s++;
          let d = new Mt(c.invert(), l, u), f, p = o.length - 1;
          (f = o.length && o[p].merge(d)) ? o[p] = f : o.push(d);
        }
      } else
        i.map && r--;
    }, this.items.length, 0), new wt(Me.from(o.reverse()), s);
  }
}
wt.empty = new wt(Me.empty, 0);
function cS(n, e) {
  let t;
  return n.forEach((r, o) => {
    if (r.selection && e-- == 0)
      return t = o, !1;
  }), n.slice(t);
}
class Mt {
  constructor(e, t, r, o) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = o;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new Mt(t.getMap().invert(), t, this.selection);
    }
  }
}
class dn {
  constructor(e, t, r, o, s) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = o, this.prevComposition = s;
  }
}
const uS = 20;
function dS(n, e, t, r) {
  let o = t.getMeta(Sn), s;
  if (o)
    return o.historyState;
  t.getMeta(pS) && (n = new dn(n.done, n.undone, null, 0, -1));
  let i = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (i && i.getMeta(Sn))
    return i.getMeta(Sn).redo ? new dn(n.done.addTransform(t, void 0, r, Rs(e)), n.undone, sf(t.mapping.maps[t.steps.length - 1]), n.prevTime, n.prevComposition) : new dn(n.done, n.undone.addTransform(t, void 0, r, Rs(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(i && i.getMeta("addToHistory") === !1)) {
    let a = t.getMeta("composition"), l = n.prevTime == 0 || !i && n.prevComposition != a && (n.prevTime < (t.time || 0) - r.newGroupDelay || !fS(t, n.prevRanges)), c = i ? Fa(n.prevRanges, t.mapping) : sf(t.mapping.maps[t.steps.length - 1]);
    return new dn(n.done.addTransform(t, l ? e.selection.getBookmark() : void 0, r, Rs(e)), wt.empty, c, t.time, a ?? n.prevComposition);
  } else
    return (s = t.getMeta("rebased")) ? new dn(n.done.rebased(t, s), n.undone.rebased(t, s), Fa(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new dn(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), Fa(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function fS(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, o) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && o >= e[s] && (t = !0);
  }), t;
}
function sf(n) {
  let e = [];
  return n.forEach((t, r, o, s) => e.push(o, s)), e;
}
function Fa(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let o = e.map(n[r], 1), s = e.map(n[r + 1], -1);
    o <= s && t.push(o, s);
  }
  return t;
}
function Nm(n, e, t, r) {
  let o = Rs(e), s = Sn.get(e).spec.config, i = (r ? n.undone : n.done).popEvent(e, o);
  if (!i)
    return;
  let a = i.selection.resolve(i.transform.doc), l = (r ? n.done : n.undone).addTransform(i.transform, e.selection.getBookmark(), s, o), c = new dn(r ? l : i.remaining, r ? i.remaining : l, null, 0, -1);
  t(i.transform.setSelection(a).setMeta(Sn, { redo: r, historyState: c }).scrollIntoView());
}
let qa = !1, af = null;
function Rs(n) {
  let e = n.plugins;
  if (af != e) {
    qa = !1, af = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        qa = !0;
        break;
      }
  }
  return qa;
}
const Sn = new Pe("history"), pS = new Pe("closeHistory");
function hS(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new be({
    key: Sn,
    state: {
      init() {
        return new dn(wt.empty, wt.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return dS(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, o = r == "historyUndo" ? Rm : r == "historyRedo" ? Lm : null;
          return o ? (t.preventDefault(), o(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
const Rm = (n, e) => {
  let t = Sn.getState(n);
  return !t || t.done.eventCount == 0 ? !1 : (e && Nm(t, n, e, !1), !0);
}, Lm = (n, e) => {
  let t = Sn.getState(n);
  return !t || t.undone.eventCount == 0 ? !1 : (e && Nm(t, n, e, !0), !0);
}, mS = ye.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => Rm(n, e),
      redo: () => ({ state: n, dispatch: e }) => Lm(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      hS(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Mod-Z": () => this.editor.commands.undo(),
      "Mod-y": () => this.editor.commands.redo(),
      "Mod-Y": () => this.editor.commands.redo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Shift-Mod-Z": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), Pm = se.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["hr", de(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: n, state: e }) => {
        const { $to: t } = e.selection, r = n();
        return t.parentOffset === 0 ? r.insertContentAt(Math.max(t.pos - 2, 0), { type: this.name }) : r.insertContent({ type: this.name }), r.command(({ tr: o, dispatch: s }) => {
          var i;
          if (s) {
            const { $to: a } = o.selection, l = a.end();
            if (a.nodeAfter)
              a.nodeAfter.isTextblock ? o.setSelection(G.create(o.doc, a.pos + 1)) : a.nodeAfter.isBlock ? o.setSelection(j.create(o.doc, a.pos)) : o.setSelection(G.create(o.doc, a.pos));
            else {
              const c = (i = a.parent.type.contentMatch.defaultType) === null || i === void 0 ? void 0 : i.create();
              c && (o.insert(l, c), o.setSelection(G.create(o.doc, l + 1)));
            }
            o.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      nm({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), gS = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))$/, yS = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))/g, bS = /(?:^|\s)((?:_)((?:[^_]+))(?:_))$/, vS = /(?:^|\s)((?:_)((?:[^_]+))(?:_))/g, kS = ke.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["em", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      ir({
        find: gS,
        type: this.type
      }),
      ir({
        find: bS,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      ar({
        find: yS,
        type: this.type
      }),
      ar({
        find: vS,
        type: this.type
      })
    ];
  }
}), xS = se.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", de(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), wS = se.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", de(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), lf = ke.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = Go(n, this.type);
        return Object.entries(t).some(([, o]) => !!o) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), cf = /^(\d+)\.\s$/, SS = se.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, ...t } = n;
    return e === 1 ? ["ol", de(this.options.HTMLAttributes, t), 0] : ["ol", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(wS.name, this.editor.getAttributes(lf.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = Ur({
      find: cf,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Ur({
      find: cf,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(lf.name) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      n
    ];
  }
}), CS = se.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), ES = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))$/, AS = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))/g, TS = ke.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["s", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    const n = {};
    return Nc() ? n["Mod-Shift-s"] = () => this.editor.commands.toggleStrike() : n["Ctrl-Shift-s"] = () => this.editor.commands.toggleStrike(), n;
  },
  addInputRules() {
    return [
      ir({
        find: ES,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      ar({
        find: AS,
        type: this.type
      })
    ];
  }
}), OS = se.create({
  name: "text",
  group: "inline"
}), MS = ye.create({
  name: "starterKit",
  addExtensions() {
    var n, e, t, r, o, s, i, a, l, c, u, d, f, p, h, m, g, b;
    const v = [];
    return this.options.blockquote !== !1 && v.push(Rw.configure((n = this.options) === null || n === void 0 ? void 0 : n.blockquote)), this.options.bold !== !1 && v.push(Fw.configure((e = this.options) === null || e === void 0 ? void 0 : e.bold)), this.options.bulletList !== !1 && v.push(zw.configure((t = this.options) === null || t === void 0 ? void 0 : t.bulletList)), this.options.code !== !1 && v.push(jw.configure((r = this.options) === null || r === void 0 ? void 0 : r.code)), this.options.codeBlock !== !1 && v.push(Ww.configure((o = this.options) === null || o === void 0 ? void 0 : o.codeBlock)), this.options.document !== !1 && v.push(Kw.configure((s = this.options) === null || s === void 0 ? void 0 : s.document)), this.options.dropcursor !== !1 && v.push(Zw.configure((i = this.options) === null || i === void 0 ? void 0 : i.dropcursor)), this.options.gapcursor !== !1 && v.push(oS.configure((a = this.options) === null || a === void 0 ? void 0 : a.gapcursor)), this.options.hardBreak !== !1 && v.push(sS.configure((l = this.options) === null || l === void 0 ? void 0 : l.hardBreak)), this.options.heading !== !1 && v.push(iS.configure((c = this.options) === null || c === void 0 ? void 0 : c.heading)), this.options.history !== !1 && v.push(mS.configure((u = this.options) === null || u === void 0 ? void 0 : u.history)), this.options.horizontalRule !== !1 && v.push(Pm.configure((d = this.options) === null || d === void 0 ? void 0 : d.horizontalRule)), this.options.italic !== !1 && v.push(kS.configure((f = this.options) === null || f === void 0 ? void 0 : f.italic)), this.options.listItem !== !1 && v.push(xS.configure((p = this.options) === null || p === void 0 ? void 0 : p.listItem)), this.options.orderedList !== !1 && v.push(SS.configure((h = this.options) === null || h === void 0 ? void 0 : h.orderedList)), this.options.paragraph !== !1 && v.push(CS.configure((m = this.options) === null || m === void 0 ? void 0 : m.paragraph)), this.options.strike !== !1 && v.push(TS.configure((g = this.options) === null || g === void 0 ? void 0 : g.strike)), this.options.text !== !1 && v.push(OS.configure((b = this.options) === null || b === void 0 ? void 0 : b.text)), v;
  }
}), DS = "aaa1rp3barth4b0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0faromeo7ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re2s2c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y0eats7k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking0channel11l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t0isalat7u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0at2delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d0network8tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntdoor4ier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5gtv3iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0eles2s3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1nder2le4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster5ia3d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4de2k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0cys3drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7serati6ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic3tual5v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rthwesternmutual14on4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3ssagens7y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cher3ks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w0time7i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ffany5ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0channel7ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lkswagen7vo3te1ing3o2yage5u0elos6wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", _S = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5تصالات6رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Zr = (n, e) => {
  for (const t in e)
    n[t] = e[t];
  return n;
}, zl = "numeric", $l = "ascii", Hl = "alpha", Ls = "asciinumeric", ws = "alphanumeric", jl = "domain", Im = "emoji", NS = "scheme", RS = "slashscheme", uf = "whitespace";
function LS(n, e) {
  return n in e || (e[n] = []), e[n];
}
function $n(n, e, t) {
  e[zl] && (e[Ls] = !0, e[ws] = !0), e[$l] && (e[Ls] = !0, e[Hl] = !0), e[Ls] && (e[ws] = !0), e[Hl] && (e[ws] = !0), e[ws] && (e[jl] = !0), e[Im] && (e[jl] = !0);
  for (const r in e) {
    const o = LS(r, t);
    o.indexOf(n) < 0 && o.push(n);
  }
}
function PS(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function Ze(n) {
  n === void 0 && (n = null), this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
Ze.groups = {};
Ze.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const o = e.jr[r][0], s = e.jr[r][1];
      if (s && o.test(n))
        return s;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(n, e) {
    return e === void 0 && (e = !1), e ? n in this.j : !!this.go(n);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(n, e, t, r) {
    for (let o = 0; o < n.length; o++)
      this.tt(n[o], e, t, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(n, e, t, r) {
    r = r || Ze.groups;
    let o;
    return e && e.j ? o = e : (o = new Ze(e), t && r && $n(e, t, r)), this.jr.push([n, o]), o;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(n, e, t, r) {
    let o = this;
    const s = n.length;
    if (!s)
      return o;
    for (let i = 0; i < s - 1; i++)
      o = o.tt(n[i]);
    return o.tt(n[s - 1], e, t, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(n, e, t, r) {
    r = r || Ze.groups;
    const o = this;
    if (e && e.j)
      return o.j[n] = e, e;
    const s = e;
    let i, a = o.go(n);
    if (a ? (i = new Ze(), Zr(i.j, a.j), i.jr.push.apply(i.jr, a.jr), i.jd = a.jd, i.t = a.t) : i = new Ze(), s) {
      if (r)
        if (i.t && typeof i.t == "string") {
          const l = Zr(PS(i.t, r), t);
          $n(s, l, r);
        } else
          t && $n(s, t, r);
      i.t = s;
    }
    return o.j[n] = i, i;
  }
};
const q = (n, e, t, r, o) => n.ta(e, t, r, o), ct = (n, e, t, r, o) => n.tr(e, t, r, o), df = (n, e, t, r, o) => n.ts(e, t, r, o), _ = (n, e, t, r, o) => n.tt(e, t, r, o), Kt = "WORD", Vl = "UWORD", $o = "LOCALHOST", Ul = "TLD", Wl = "UTLD", Ps = "SCHEME", Tr = "SLASH_SCHEME", Wc = "NUM", Bm = "WS", Kc = "NL", Dr = "OPENBRACE", Eo = "OPENBRACKET", Ao = "OPENANGLEBRACKET", To = "OPENPAREN", Bn = "CLOSEBRACE", _r = "CLOSEBRACKET", Nr = "CLOSEANGLEBRACKET", Fn = "CLOSEPAREN", ni = "AMPERSAND", ri = "APOSTROPHE", oi = "ASTERISK", fn = "AT", si = "BACKSLASH", ii = "BACKTICK", ai = "CARET", gn = "COLON", Jc = "COMMA", li = "DOLLAR", Dt = "DOT", ci = "EQUALS", Gc = "EXCLAMATION", _t = "HYPHEN", ui = "PERCENT", di = "PIPE", fi = "PLUS", pi = "POUND", hi = "QUERY", Zc = "QUOTE", Yc = "SEMI", Nt = "SLASH", Oo = "TILDE", mi = "UNDERSCORE", Fm = "EMOJI", gi = "SYM";
var qm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: Kt,
  UWORD: Vl,
  LOCALHOST: $o,
  TLD: Ul,
  UTLD: Wl,
  SCHEME: Ps,
  SLASH_SCHEME: Tr,
  NUM: Wc,
  WS: Bm,
  NL: Kc,
  OPENBRACE: Dr,
  OPENBRACKET: Eo,
  OPENANGLEBRACKET: Ao,
  OPENPAREN: To,
  CLOSEBRACE: Bn,
  CLOSEBRACKET: _r,
  CLOSEANGLEBRACKET: Nr,
  CLOSEPAREN: Fn,
  AMPERSAND: ni,
  APOSTROPHE: ri,
  ASTERISK: oi,
  AT: fn,
  BACKSLASH: si,
  BACKTICK: ii,
  CARET: ai,
  COLON: gn,
  COMMA: Jc,
  DOLLAR: li,
  DOT: Dt,
  EQUALS: ci,
  EXCLAMATION: Gc,
  HYPHEN: _t,
  PERCENT: ui,
  PIPE: di,
  PLUS: fi,
  POUND: pi,
  QUERY: hi,
  QUOTE: Zc,
  SEMI: Yc,
  SLASH: Nt,
  TILDE: Oo,
  UNDERSCORE: mi,
  EMOJI: Fm,
  SYM: gi
});
const kr = /[a-z]/, za = /\p{L}/u, $a = /\p{Emoji}/u, Ha = /\d/, ff = /\s/, pf = `
`, IS = "️", BS = "‍";
let Ss = null, Cs = null;
function FS(n) {
  n === void 0 && (n = []);
  const e = {};
  Ze.groups = e;
  const t = new Ze();
  Ss == null && (Ss = hf(DS)), Cs == null && (Cs = hf(_S)), _(t, "'", ri), _(t, "{", Dr), _(t, "[", Eo), _(t, "<", Ao), _(t, "(", To), _(t, "}", Bn), _(t, "]", _r), _(t, ">", Nr), _(t, ")", Fn), _(t, "&", ni), _(t, "*", oi), _(t, "@", fn), _(t, "`", ii), _(t, "^", ai), _(t, ":", gn), _(t, ",", Jc), _(t, "$", li), _(t, ".", Dt), _(t, "=", ci), _(t, "!", Gc), _(t, "-", _t), _(t, "%", ui), _(t, "|", di), _(t, "+", fi), _(t, "#", pi), _(t, "?", hi), _(t, '"', Zc), _(t, "/", Nt), _(t, ";", Yc), _(t, "~", Oo), _(t, "_", mi), _(t, "\\", si);
  const r = ct(t, Ha, Wc, {
    [zl]: !0
  });
  ct(r, Ha, r);
  const o = ct(t, kr, Kt, {
    [$l]: !0
  });
  ct(o, kr, o);
  const s = ct(t, za, Vl, {
    [Hl]: !0
  });
  ct(s, kr), ct(s, za, s);
  const i = ct(t, ff, Bm, {
    [uf]: !0
  });
  _(t, pf, Kc, {
    [uf]: !0
  }), _(i, pf), ct(i, ff, i);
  const a = ct(t, $a, Fm, {
    [Im]: !0
  });
  ct(a, $a, a), _(a, IS, a);
  const l = _(a, BS);
  ct(l, $a, a);
  const c = [[kr, o]], u = [[kr, null], [za, s]];
  for (let d = 0; d < Ss.length; d++)
    ln(t, Ss[d], Ul, Kt, c);
  for (let d = 0; d < Cs.length; d++)
    ln(t, Cs[d], Wl, Vl, u);
  $n(Ul, {
    tld: !0,
    ascii: !0
  }, e), $n(Wl, {
    utld: !0,
    alpha: !0
  }, e), ln(t, "file", Ps, Kt, c), ln(t, "mailto", Ps, Kt, c), ln(t, "http", Tr, Kt, c), ln(t, "https", Tr, Kt, c), ln(t, "ftp", Tr, Kt, c), ln(t, "ftps", Tr, Kt, c), $n(Ps, {
    scheme: !0,
    ascii: !0
  }, e), $n(Tr, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((d, f) => d[0] > f[0] ? 1 : -1);
  for (let d = 0; d < n.length; d++) {
    const f = n[d][0], h = n[d][1] ? {
      [NS]: !0
    } : {
      [RS]: !0
    };
    f.indexOf("-") >= 0 ? h[jl] = !0 : kr.test(f) ? Ha.test(f) ? h[Ls] = !0 : h[$l] = !0 : h[zl] = !0, df(t, f, f, h);
  }
  return df(t, "localhost", $o, {
    ascii: !0
  }), t.jd = new Ze(gi), {
    start: t,
    tokens: Zr({
      groups: e
    }, qm)
  };
}
function qS(n, e) {
  const t = zS(e.replace(/[A-Z]/g, (a) => a.toLowerCase())), r = t.length, o = [];
  let s = 0, i = 0;
  for (; i < r; ) {
    let a = n, l = null, c = 0, u = null, d = -1, f = -1;
    for (; i < r && (l = a.go(t[i])); )
      a = l, a.accepts() ? (d = 0, f = 0, u = a) : d >= 0 && (d += t[i].length, f++), c += t[i].length, s += t[i].length, i++;
    s -= d, i -= f, c -= d, o.push({
      t: u.t,
      // token type/name
      v: e.slice(s - c, s),
      // string value
      s: s - c,
      // start index
      e: s
      // end index (excluding)
    });
  }
  return o;
}
function zS(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let o = n.charCodeAt(r), s, i = o < 55296 || o > 56319 || r + 1 === t || (s = n.charCodeAt(r + 1)) < 56320 || s > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(i), r += i.length;
  }
  return e;
}
function ln(n, e, t, r, o) {
  let s;
  const i = e.length;
  for (let a = 0; a < i - 1; a++) {
    const l = e[a];
    n.j[l] ? s = n.j[l] : (s = new Ze(r), s.jr = o.slice(), n.j[l] = s), n = s;
  }
  return s = new Ze(t), s.jr = o.slice(), n.j[e[i - 1]] = s, s;
}
function hf(n) {
  const e = [], t = [];
  let r = 0, o = "0123456789";
  for (; r < n.length; ) {
    let s = 0;
    for (; o.indexOf(n[r + s]) >= 0; )
      s++;
    if (s > 0) {
      e.push(t.join(""));
      for (let i = parseInt(n.substring(r, r + s), 10); i > 0; i--)
        t.pop();
      r += s;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const Ho = {
  defaultProtocol: "http",
  events: null,
  format: mf,
  formatHref: mf,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Xc(n, e) {
  e === void 0 && (e = null);
  let t = Zr({}, Ho);
  n && (t = Zr(t, n instanceof Xc ? n.o : n));
  const r = t.ignoreTags, o = [];
  for (let s = 0; s < r.length; s++)
    o.push(r[s].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = o;
}
Xc.prototype = {
  o: Ho,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(n) {
    return n;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(n) {
    return this.get("validate", n.toString(), n);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(n, e, t) {
    const r = e != null;
    let o = this.o[n];
    return o && (typeof o == "object" ? (o = t.t in o ? o[t.t] : Ho[n], typeof o == "function" && r && (o = o(e, t))) : typeof o == "function" && r && (o = o(e, t.t, t)), o);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function mf(n) {
  return n;
}
function zm(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
zm.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
  */
  toHref(n) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(n) {
    return n === void 0 && (n = Ho.defaultProtocol), {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), o = n.get("tagName", t, e), s = this.toFormattedString(n), i = {}, a = n.get("className", t, e), l = n.get("target", t, e), c = n.get("rel", t, e), u = n.getObj("attributes", t, e), d = n.getObj("events", t, e);
    return i.href = r, a && (i.class = a), l && (i.target = l), c && (i.rel = c), u && Zr(i, u), {
      tagName: o,
      attributes: i,
      content: s,
      eventListeners: d
    };
  }
};
function ji(n, e) {
  class t extends zm {
    constructor(o, s) {
      super(o, s), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const gf = ji("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), yf = ji("text"), $S = ji("nl"), Nn = ji("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n) {
    return n === void 0 && (n = Ho.defaultProtocol), this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== $o && n[1].t === gn;
  }
}), Ae = (n) => new Ze(n);
function HS(n) {
  let {
    groups: e
  } = n;
  const t = e.domain.concat([ni, oi, fn, si, ii, ai, li, ci, _t, Wc, ui, di, fi, pi, Nt, gi, Oo, mi]), r = [ri, Nr, Bn, _r, Fn, gn, Jc, Dt, Gc, Ao, Dr, Eo, To, hi, Zc, Yc], o = [ni, ri, oi, si, ii, ai, Bn, li, ci, _t, Dr, ui, di, fi, pi, hi, Nt, gi, Oo, mi], s = Ae(), i = _(s, Oo);
  q(i, o, i), q(i, e.domain, i);
  const a = Ae(), l = Ae(), c = Ae();
  q(s, e.domain, a), q(s, e.scheme, l), q(s, e.slashscheme, c), q(a, o, i), q(a, e.domain, a);
  const u = _(a, fn);
  _(i, fn, u), _(l, fn, u), _(c, fn, u);
  const d = _(i, Dt);
  q(d, o, i), q(d, e.domain, i);
  const f = Ae();
  q(u, e.domain, f), q(f, e.domain, f);
  const p = _(f, Dt);
  q(p, e.domain, f);
  const h = Ae(gf);
  q(p, e.tld, h), q(p, e.utld, h), _(u, $o, h);
  const m = _(f, _t);
  q(m, e.domain, f), q(h, e.domain, f), _(h, Dt, p), _(h, _t, m);
  const g = _(h, gn);
  q(g, e.numeric, gf);
  const b = _(a, _t), v = _(a, Dt);
  q(b, e.domain, a), q(v, o, i), q(v, e.domain, a);
  const x = Ae(Nn);
  q(v, e.tld, x), q(v, e.utld, x), q(x, e.domain, a), q(x, o, i), _(x, Dt, v), _(x, _t, b), _(x, fn, u);
  const y = _(x, gn), w = Ae(Nn);
  q(y, e.numeric, w);
  const k = Ae(Nn), S = Ae();
  q(k, t, k), q(k, r, S), q(S, t, k), q(S, r, S), _(x, Nt, k), _(w, Nt, k);
  const E = _(l, gn), T = _(c, gn), D = _(T, Nt), N = _(D, Nt);
  q(l, e.domain, a), _(l, Dt, v), _(l, _t, b), q(c, e.domain, a), _(c, Dt, v), _(c, _t, b), q(E, e.domain, k), _(E, Nt, k), q(N, e.domain, k), q(N, t, k), _(N, Nt, k);
  const z = _(k, Dr), I = _(k, Eo), O = _(k, Ao), F = _(k, To);
  _(S, Dr, z), _(S, Eo, I), _(S, Ao, O), _(S, To, F), _(z, Bn, k), _(I, _r, k), _(O, Nr, k), _(F, Fn, k), _(z, Bn, k);
  const L = Ae(Nn), $ = Ae(Nn), ee = Ae(Nn), ne = Ae(Nn);
  q(z, t, L), q(I, t, $), q(O, t, ee), q(F, t, ne);
  const ve = Ae(), Ce = Ae(), _e = Ae(), Z = Ae();
  return q(z, r), q(I, r), q(O, r), q(F, r), q(L, t, L), q($, t, $), q(ee, t, ee), q(ne, t, ne), q(L, r, L), q($, r, $), q(ee, r, ee), q(ne, r, ne), q(ve, t, ve), q(Ce, t, $), q(_e, t, ee), q(Z, t, ne), q(ve, r, ve), q(Ce, r, Ce), q(_e, r, _e), q(Z, r, Z), _($, _r, k), _(ee, Nr, k), _(ne, Fn, k), _(L, Bn, k), _(Ce, _r, k), _(_e, Nr, k), _(Z, Fn, k), _(ve, Fn, k), _(s, $o, x), _(s, Kc, $S), {
    start: s,
    tokens: qm
  };
}
function jS(n, e, t) {
  let r = t.length, o = 0, s = [], i = [];
  for (; o < r; ) {
    let a = n, l = null, c = null, u = 0, d = null, f = -1;
    for (; o < r && !(l = a.go(t[o].t)); )
      i.push(t[o++]);
    for (; o < r && (c = l || a.go(t[o].t)); )
      l = null, a = c, a.accepts() ? (f = 0, d = a) : f >= 0 && f++, o++, u++;
    if (f < 0)
      o -= u, o < r && (i.push(t[o]), o++);
    else {
      i.length > 0 && (s.push(ja(yf, e, i)), i = []), o -= f, u -= f;
      const p = d.t, h = t.slice(o - u, o);
      s.push(ja(p, e, h));
    }
  }
  return i.length > 0 && s.push(ja(yf, e, i)), s;
}
function ja(n, e, t) {
  const r = t[0].s, o = t[t.length - 1].e, s = e.slice(r, o);
  return new n(s, t);
}
const VS = typeof console < "u" && console && console.warn || (() => {
}), US = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", pe = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function WS() {
  Ze.groups = {}, pe.scanner = null, pe.parser = null, pe.tokenQueue = [], pe.pluginQueue = [], pe.customSchemes = [], pe.initialized = !1;
}
function bf(n, e) {
  if (e === void 0 && (e = !1), pe.initialized && VS(`linkifyjs: already initialized - will not register custom scheme "${n}" ${US}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
 1. Must only contain digits, lowercase ASCII letters or "-"
 2. Cannot start or end with "-"
 3. "-" cannot repeat`);
  pe.customSchemes.push([n, e]);
}
function KS() {
  pe.scanner = FS(pe.customSchemes);
  for (let n = 0; n < pe.tokenQueue.length; n++)
    pe.tokenQueue[n][1]({
      scanner: pe.scanner
    });
  pe.parser = HS(pe.scanner.tokens);
  for (let n = 0; n < pe.pluginQueue.length; n++)
    pe.pluginQueue[n][1]({
      scanner: pe.scanner,
      parser: pe.parser
    });
  pe.initialized = !0;
}
function JS(n) {
  return pe.initialized || KS(), jS(pe.parser.start, n, qS(pe.scanner.start, n));
}
function Kl(n, e, t) {
  if (e === void 0 && (e = null), t === void 0 && (t = null), e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new Xc(t), o = JS(n), s = [];
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    a.isLink && (!e || a.t === e) && s.push(a.toFormattedObject(r));
  }
  return s;
}
function GS(n) {
  return new be({
    key: new Pe("autolink"),
    appendTransaction: (e, t, r) => {
      const o = e.some((c) => c.docChanged) && !t.doc.eq(r.doc), s = e.some((c) => c.getMeta("preventAutolink"));
      if (!o || s)
        return;
      const { tr: i } = r, a = Dk(t.doc, [...e]);
      if (Fk(a).forEach(({ newRange: c }) => {
        const u = Nk(r.doc, c, (p) => p.isTextblock);
        let d, f;
        if (u.length > 1 ? (d = u[0], f = r.doc.textBetween(d.pos, d.pos + d.node.nodeSize, void 0, " ")) : u.length && r.doc.textBetween(c.from, c.to, " ", " ").endsWith(" ") && (d = u[0], f = r.doc.textBetween(d.pos, c.to, void 0, " ")), d && f) {
          const p = f.split(" ").filter((g) => g !== "");
          if (p.length <= 0)
            return !1;
          const h = p[p.length - 1], m = d.pos + f.lastIndexOf(h);
          if (!h)
            return !1;
          Kl(h).filter((g) => g.isLink).map((g) => ({
            ...g,
            from: m + g.start + 1,
            to: m + g.end + 1
          })).filter((g) => r.schema.marks.code ? !r.doc.rangeHasMark(g.from, g.to, r.schema.marks.code) : !0).filter((g) => n.validate ? n.validate(g.value) : !0).forEach((g) => {
            Pc(g.from, g.to, r.doc).some((b) => b.mark.type === n.type) || i.addMark(g.from, g.to, n.type.create({
              href: g.href
            }));
          });
        }
      }), !!i.steps.length)
        return i;
    }
  });
}
function ZS(n) {
  return new be({
    key: new Pe("handleClickLink"),
    props: {
      handleClick: (e, t, r) => {
        var o, s;
        if (r.button !== 0)
          return !1;
        const i = Qh(e.state, n.type.name), a = r.target, l = (o = a == null ? void 0 : a.href) !== null && o !== void 0 ? o : i.href, c = (s = a == null ? void 0 : a.target) !== null && s !== void 0 ? s : i.target;
        return a && l ? (e.editable && window.open(l, c), !0) : !1;
      }
    }
  });
}
function YS(n) {
  return new be({
    key: new Pe("handlePasteLink"),
    props: {
      handlePaste: (e, t, r) => {
        var o, s;
        const { state: i } = e, { selection: a } = i;
        if (i.doc.resolve(a.from).parent.type.spec.code)
          return !1;
        let l = "";
        r.content.forEach((v) => {
          l += v.textContent;
        });
        let c = !1;
        if (r.content.descendants((v) => {
          v.marks.some((x) => x.type.name === n.type.name) && (c = !0);
        }), c)
          return;
        const u = Kl(l).find((v) => v.isLink && v.value === l);
        if (!a.empty && n.linkOnPaste) {
          const v = (u == null ? void 0 : u.href) || null;
          if (v)
            return n.editor.commands.setMark(n.type, { href: v }), !0;
        }
        const d = ((o = r.content.firstChild) === null || o === void 0 ? void 0 : o.type.name) === "text", f = (s = r.content.firstChild) === null || s === void 0 ? void 0 : s.marks.some((v) => v.type.name === n.type.name);
        if (d && f || !n.linkOnPaste)
          return !1;
        if (u && a.empty)
          return n.editor.commands.insertContent(`<a href="${u.href}">${u.href}</a>`), !0;
        const { tr: p } = i;
        let h = !1;
        a.empty || (h = !0, p.delete(a.from, a.to));
        let m = a.from, g = [];
        r.content.forEach((v) => {
          g = Kl(v.textContent), p.insert(m - 1, v), g.length > 0 && (h = !1, g.forEach((x) => {
            const y = m + x.start, w = m + x.end;
            p.doc.rangeHasMark(y, w, n.type) || p.addMark(y, w, n.type.create({ href: x.href }));
          })), m += v.nodeSize;
        });
        const b = g.length > 0;
        return p.docChanged && !h && b ? (n.editor.view.dispatch(p), !0) : !1;
      }
    }
  });
}
const XS = ke.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  onCreate() {
    this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        bf(n);
        return;
      }
      bf(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    WS();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: void 0
    };
  },
  addAttributes() {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["a", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setLink: (n) => ({ chain: e }) => e().setMark(this.name, n).setMeta("preventAutolink", !0).run(),
      toggleLink: (n) => ({ chain: e }) => e().toggleMark(this.name, n, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run(),
      unsetLink: () => ({ chain: n }) => n().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addProseMirrorPlugins() {
    const n = [];
    return this.options.autolink && n.push(GS({
      type: this.type,
      validate: this.options.validate
    })), this.options.openOnClick && n.push(ZS({
      type: this.type
    })), n.push(YS({
      editor: this.editor,
      type: this.type,
      linkOnPaste: this.options.linkOnPaste
    })), n;
  }
}), QS = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, $m = se.create({
  name: "image",
  addOptions() {
    return {
      inline: !1,
      allowBase64: !1,
      HTMLAttributes: {}
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: !0,
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["img", de(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setImage: (n) => ({ commands: e }) => e.insertContent({
        type: this.name,
        attrs: n
      })
    };
  },
  addInputRules() {
    return [
      nm({
        find: QS,
        type: this.type,
        getAttributes: (n) => {
          const [, , e, t, r] = n;
          return { src: t, alt: e, title: r };
        }
      })
    ];
  }
}), eC = ye.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new be({
        key: new Pe("placeholder"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const t = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: r } = e, o = [];
            if (!t)
              return null;
            const s = n.type.createAndFill(), i = (s == null ? void 0 : s.sameMarkup(n)) && s.content.findDiffStart(n.content) === null;
            return n.descendants((a, l) => {
              const c = r >= l && r <= l + a.nodeSize, u = !a.isLeaf && !a.childCount;
              if ((c || !this.options.showOnlyCurrent) && u) {
                const d = [this.options.emptyNodeClass];
                i && d.push(this.options.emptyEditorClass);
                const f = $e.node(l, l + a.nodeSize, {
                  class: d.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: a,
                    pos: l,
                    hasAnchor: c
                  }) : this.options.placeholder
                });
                o.push(f);
              }
              return this.options.includeChildren;
            }), me.create(n, o);
          }
        }
      })
    ];
  }
}), tC = ke.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["u", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: n }) => n.setMark(this.name),
      toggleUnderline: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetUnderline: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
}), nC = ke.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = Go(n, this.type);
        return Object.entries(t).some(([, o]) => !!o) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), rC = ye.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (n) => {
              var e;
              return (e = n.style.color) === null || e === void 0 ? void 0 : e.replace(/['"]+/g, "");
            },
            renderHTML: (n) => n.color ? {
              style: `color: ${n.color}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (n) => ({ chain: e }) => e().setMark("textStyle", { color: n }).run(),
      unsetColor: () => ({ chain: n }) => n().setMark("textStyle", { color: null }).removeEmptyTextStyle().run()
    };
  }
}), oC = /^\s*(\[([( |x])?\])\s$/, sC = se.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: !1,
      HTMLAttributes: {},
      taskListTypeName: "taskList"
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: !0,
  addAttributes() {
    return {
      checked: {
        default: !1,
        keepOnSplit: !1,
        parseHTML: (n) => n.getAttribute("data-checked") === "true",
        renderHTML: (n) => ({
          "data-checked": n.checked
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "li",
      de(this.options.HTMLAttributes, e, {
        "data-type": this.name
      }),
      [
        "label",
        [
          "input",
          {
            type: "checkbox",
            checked: n.attrs.checked ? "checked" : null
          }
        ],
        ["span"]
      ],
      ["div", 0]
    ];
  },
  addKeyboardShortcuts() {
    const n = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    return this.options.nested ? {
      ...n,
      Tab: () => this.editor.commands.sinkListItem(this.name)
    } : n;
  },
  addNodeView() {
    return ({ node: n, HTMLAttributes: e, getPos: t, editor: r }) => {
      const o = document.createElement("li"), s = document.createElement("label"), i = document.createElement("span"), a = document.createElement("input"), l = document.createElement("div");
      return s.contentEditable = "false", a.type = "checkbox", a.addEventListener("change", (c) => {
        if (!r.isEditable && !this.options.onReadOnlyChecked) {
          a.checked = !a.checked;
          return;
        }
        const { checked: u } = c.target;
        r.isEditable && typeof t == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: d }) => {
          const f = t(), p = d.doc.nodeAt(f);
          return d.setNodeMarkup(f, void 0, {
            ...p == null ? void 0 : p.attrs,
            checked: u
          }), !0;
        }).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(n, u) || (a.checked = !a.checked));
      }), Object.entries(this.options.HTMLAttributes).forEach(([c, u]) => {
        o.setAttribute(c, u);
      }), o.dataset.checked = n.attrs.checked, n.attrs.checked && a.setAttribute("checked", "checked"), s.append(a, i), o.append(s, l), Object.entries(e).forEach(([c, u]) => {
        o.setAttribute(c, u);
      }), {
        dom: o,
        contentDOM: l,
        update: (c) => c.type !== this.type ? !1 : (o.dataset.checked = c.attrs.checked, c.attrs.checked ? a.setAttribute("checked", "checked") : a.removeAttribute("checked"), !0)
      };
    };
  },
  addInputRules() {
    return [
      Ur({
        find: oC,
        type: this.type,
        getAttributes: (n) => ({
          checked: n[n.length - 1] === "x"
        })
      })
    ];
  }
}), iC = se.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", de(this.options.HTMLAttributes, n, { "data-type": this.name }), 0];
  },
  addCommands() {
    return {
      toggleTaskList: () => ({ commands: n }) => n.toggleList(this.name, this.options.itemTypeName)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
    };
  }
});
function Hm(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function aC(n) {
  if (n.__esModule)
    return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(t, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), t;
}
var ie = {};
const lC = "Á", cC = "á", uC = "Ă", dC = "ă", fC = "∾", pC = "∿", hC = "∾̳", mC = "Â", gC = "â", yC = "´", bC = "А", vC = "а", kC = "Æ", xC = "æ", wC = "⁡", SC = "𝔄", CC = "𝔞", EC = "À", AC = "à", TC = "ℵ", OC = "ℵ", MC = "Α", DC = "α", _C = "Ā", NC = "ā", RC = "⨿", LC = "&", PC = "&", IC = "⩕", BC = "⩓", FC = "∧", qC = "⩜", zC = "⩘", $C = "⩚", HC = "∠", jC = "⦤", VC = "∠", UC = "⦨", WC = "⦩", KC = "⦪", JC = "⦫", GC = "⦬", ZC = "⦭", YC = "⦮", XC = "⦯", QC = "∡", eE = "∟", tE = "⊾", nE = "⦝", rE = "∢", oE = "Å", sE = "⍼", iE = "Ą", aE = "ą", lE = "𝔸", cE = "𝕒", uE = "⩯", dE = "≈", fE = "⩰", pE = "≊", hE = "≋", mE = "'", gE = "⁡", yE = "≈", bE = "≊", vE = "Å", kE = "å", xE = "𝒜", wE = "𝒶", SE = "≔", CE = "*", EE = "≈", AE = "≍", TE = "Ã", OE = "ã", ME = "Ä", DE = "ä", _E = "∳", NE = "⨑", RE = "≌", LE = "϶", PE = "‵", IE = "∽", BE = "⋍", FE = "∖", qE = "⫧", zE = "⊽", $E = "⌅", HE = "⌆", jE = "⌅", VE = "⎵", UE = "⎶", WE = "≌", KE = "Б", JE = "б", GE = "„", ZE = "∵", YE = "∵", XE = "∵", QE = "⦰", eA = "϶", tA = "ℬ", nA = "ℬ", rA = "Β", oA = "β", sA = "ℶ", iA = "≬", aA = "𝔅", lA = "𝔟", cA = "⋂", uA = "◯", dA = "⋃", fA = "⨀", pA = "⨁", hA = "⨂", mA = "⨆", gA = "★", yA = "▽", bA = "△", vA = "⨄", kA = "⋁", xA = "⋀", wA = "⤍", SA = "⧫", CA = "▪", EA = "▴", AA = "▾", TA = "◂", OA = "▸", MA = "␣", DA = "▒", _A = "░", NA = "▓", RA = "█", LA = "=⃥", PA = "≡⃥", IA = "⫭", BA = "⌐", FA = "𝔹", qA = "𝕓", zA = "⊥", $A = "⊥", HA = "⋈", jA = "⧉", VA = "┐", UA = "╕", WA = "╖", KA = "╗", JA = "┌", GA = "╒", ZA = "╓", YA = "╔", XA = "─", QA = "═", eT = "┬", tT = "╤", nT = "╥", rT = "╦", oT = "┴", sT = "╧", iT = "╨", aT = "╩", lT = "⊟", cT = "⊞", uT = "⊠", dT = "┘", fT = "╛", pT = "╜", hT = "╝", mT = "└", gT = "╘", yT = "╙", bT = "╚", vT = "│", kT = "║", xT = "┼", wT = "╪", ST = "╫", CT = "╬", ET = "┤", AT = "╡", TT = "╢", OT = "╣", MT = "├", DT = "╞", _T = "╟", NT = "╠", RT = "‵", LT = "˘", PT = "˘", IT = "¦", BT = "𝒷", FT = "ℬ", qT = "⁏", zT = "∽", $T = "⋍", HT = "⧅", jT = "\\", VT = "⟈", UT = "•", WT = "•", KT = "≎", JT = "⪮", GT = "≏", ZT = "≎", YT = "≏", XT = "Ć", QT = "ć", eO = "⩄", tO = "⩉", nO = "⩋", rO = "∩", oO = "⋒", sO = "⩇", iO = "⩀", aO = "ⅅ", lO = "∩︀", cO = "⁁", uO = "ˇ", dO = "ℭ", fO = "⩍", pO = "Č", hO = "č", mO = "Ç", gO = "ç", yO = "Ĉ", bO = "ĉ", vO = "∰", kO = "⩌", xO = "⩐", wO = "Ċ", SO = "ċ", CO = "¸", EO = "¸", AO = "⦲", TO = "¢", OO = "·", MO = "·", DO = "𝔠", _O = "ℭ", NO = "Ч", RO = "ч", LO = "✓", PO = "✓", IO = "Χ", BO = "χ", FO = "ˆ", qO = "≗", zO = "↺", $O = "↻", HO = "⊛", jO = "⊚", VO = "⊝", UO = "⊙", WO = "®", KO = "Ⓢ", JO = "⊖", GO = "⊕", ZO = "⊗", YO = "○", XO = "⧃", QO = "≗", eM = "⨐", tM = "⫯", nM = "⧂", rM = "∲", oM = "”", sM = "’", iM = "♣", aM = "♣", lM = ":", cM = "∷", uM = "⩴", dM = "≔", fM = "≔", pM = ",", hM = "@", mM = "∁", gM = "∘", yM = "∁", bM = "ℂ", vM = "≅", kM = "⩭", xM = "≡", wM = "∮", SM = "∯", CM = "∮", EM = "𝕔", AM = "ℂ", TM = "∐", OM = "∐", MM = "©", DM = "©", _M = "℗", NM = "∳", RM = "↵", LM = "✗", PM = "⨯", IM = "𝒞", BM = "𝒸", FM = "⫏", qM = "⫑", zM = "⫐", $M = "⫒", HM = "⋯", jM = "⤸", VM = "⤵", UM = "⋞", WM = "⋟", KM = "↶", JM = "⤽", GM = "⩈", ZM = "⩆", YM = "≍", XM = "∪", QM = "⋓", eD = "⩊", tD = "⊍", nD = "⩅", rD = "∪︀", oD = "↷", sD = "⤼", iD = "⋞", aD = "⋟", lD = "⋎", cD = "⋏", uD = "¤", dD = "↶", fD = "↷", pD = "⋎", hD = "⋏", mD = "∲", gD = "∱", yD = "⌭", bD = "†", vD = "‡", kD = "ℸ", xD = "↓", wD = "↡", SD = "⇓", CD = "‐", ED = "⫤", AD = "⊣", TD = "⤏", OD = "˝", MD = "Ď", DD = "ď", _D = "Д", ND = "д", RD = "‡", LD = "⇊", PD = "ⅅ", ID = "ⅆ", BD = "⤑", FD = "⩷", qD = "°", zD = "∇", $D = "Δ", HD = "δ", jD = "⦱", VD = "⥿", UD = "𝔇", WD = "𝔡", KD = "⥥", JD = "⇃", GD = "⇂", ZD = "´", YD = "˙", XD = "˝", QD = "`", e_ = "˜", t_ = "⋄", n_ = "⋄", r_ = "⋄", o_ = "♦", s_ = "♦", i_ = "¨", a_ = "ⅆ", l_ = "ϝ", c_ = "⋲", u_ = "÷", d_ = "÷", f_ = "⋇", p_ = "⋇", h_ = "Ђ", m_ = "ђ", g_ = "⌞", y_ = "⌍", b_ = "$", v_ = "𝔻", k_ = "𝕕", x_ = "¨", w_ = "˙", S_ = "⃜", C_ = "≐", E_ = "≑", A_ = "≐", T_ = "∸", O_ = "∔", M_ = "⊡", D_ = "⌆", __ = "∯", N_ = "¨", R_ = "⇓", L_ = "⇐", P_ = "⇔", I_ = "⫤", B_ = "⟸", F_ = "⟺", q_ = "⟹", z_ = "⇒", $_ = "⊨", H_ = "⇑", j_ = "⇕", V_ = "∥", U_ = "⤓", W_ = "↓", K_ = "↓", J_ = "⇓", G_ = "⇵", Z_ = "̑", Y_ = "⇊", X_ = "⇃", Q_ = "⇂", e2 = "⥐", t2 = "⥞", n2 = "⥖", r2 = "↽", o2 = "⥟", s2 = "⥗", i2 = "⇁", a2 = "↧", l2 = "⊤", c2 = "⤐", u2 = "⌟", d2 = "⌌", f2 = "𝒟", p2 = "𝒹", h2 = "Ѕ", m2 = "ѕ", g2 = "⧶", y2 = "Đ", b2 = "đ", v2 = "⋱", k2 = "▿", x2 = "▾", w2 = "⇵", S2 = "⥯", C2 = "⦦", E2 = "Џ", A2 = "џ", T2 = "⟿", O2 = "É", M2 = "é", D2 = "⩮", _2 = "Ě", N2 = "ě", R2 = "Ê", L2 = "ê", P2 = "≖", I2 = "≕", B2 = "Э", F2 = "э", q2 = "⩷", z2 = "Ė", $2 = "ė", H2 = "≑", j2 = "ⅇ", V2 = "≒", U2 = "𝔈", W2 = "𝔢", K2 = "⪚", J2 = "È", G2 = "è", Z2 = "⪖", Y2 = "⪘", X2 = "⪙", Q2 = "∈", eN = "⏧", tN = "ℓ", nN = "⪕", rN = "⪗", oN = "Ē", sN = "ē", iN = "∅", aN = "∅", lN = "◻", cN = "∅", uN = "▫", dN = " ", fN = " ", pN = " ", hN = "Ŋ", mN = "ŋ", gN = " ", yN = "Ę", bN = "ę", vN = "𝔼", kN = "𝕖", xN = "⋕", wN = "⧣", SN = "⩱", CN = "ε", EN = "Ε", AN = "ε", TN = "ϵ", ON = "≖", MN = "≕", DN = "≂", _N = "⪖", NN = "⪕", RN = "⩵", LN = "=", PN = "≂", IN = "≟", BN = "⇌", FN = "≡", qN = "⩸", zN = "⧥", $N = "⥱", HN = "≓", jN = "ℯ", VN = "ℰ", UN = "≐", WN = "⩳", KN = "≂", JN = "Η", GN = "η", ZN = "Ð", YN = "ð", XN = "Ë", QN = "ë", eR = "€", tR = "!", nR = "∃", rR = "∃", oR = "ℰ", sR = "ⅇ", iR = "ⅇ", aR = "≒", lR = "Ф", cR = "ф", uR = "♀", dR = "ﬃ", fR = "ﬀ", pR = "ﬄ", hR = "𝔉", mR = "𝔣", gR = "ﬁ", yR = "◼", bR = "▪", vR = "fj", kR = "♭", xR = "ﬂ", wR = "▱", SR = "ƒ", CR = "𝔽", ER = "𝕗", AR = "∀", TR = "∀", OR = "⋔", MR = "⫙", DR = "ℱ", _R = "⨍", NR = "½", RR = "⅓", LR = "¼", PR = "⅕", IR = "⅙", BR = "⅛", FR = "⅔", qR = "⅖", zR = "¾", $R = "⅗", HR = "⅜", jR = "⅘", VR = "⅚", UR = "⅝", WR = "⅞", KR = "⁄", JR = "⌢", GR = "𝒻", ZR = "ℱ", YR = "ǵ", XR = "Γ", QR = "γ", eL = "Ϝ", tL = "ϝ", nL = "⪆", rL = "Ğ", oL = "ğ", sL = "Ģ", iL = "Ĝ", aL = "ĝ", lL = "Г", cL = "г", uL = "Ġ", dL = "ġ", fL = "≥", pL = "≧", hL = "⪌", mL = "⋛", gL = "≥", yL = "≧", bL = "⩾", vL = "⪩", kL = "⩾", xL = "⪀", wL = "⪂", SL = "⪄", CL = "⋛︀", EL = "⪔", AL = "𝔊", TL = "𝔤", OL = "≫", ML = "⋙", DL = "⋙", _L = "ℷ", NL = "Ѓ", RL = "ѓ", LL = "⪥", PL = "≷", IL = "⪒", BL = "⪤", FL = "⪊", qL = "⪊", zL = "⪈", $L = "≩", HL = "⪈", jL = "≩", VL = "⋧", UL = "𝔾", WL = "𝕘", KL = "`", JL = "≥", GL = "⋛", ZL = "≧", YL = "⪢", XL = "≷", QL = "⩾", eP = "≳", tP = "𝒢", nP = "ℊ", rP = "≳", oP = "⪎", sP = "⪐", iP = "⪧", aP = "⩺", lP = ">", cP = ">", uP = "≫", dP = "⋗", fP = "⦕", pP = "⩼", hP = "⪆", mP = "⥸", gP = "⋗", yP = "⋛", bP = "⪌", vP = "≷", kP = "≳", xP = "≩︀", wP = "≩︀", SP = "ˇ", CP = " ", EP = "½", AP = "ℋ", TP = "Ъ", OP = "ъ", MP = "⥈", DP = "↔", _P = "⇔", NP = "↭", RP = "^", LP = "ℏ", PP = "Ĥ", IP = "ĥ", BP = "♥", FP = "♥", qP = "…", zP = "⊹", $P = "𝔥", HP = "ℌ", jP = "ℋ", VP = "⤥", UP = "⤦", WP = "⇿", KP = "∻", JP = "↩", GP = "↪", ZP = "𝕙", YP = "ℍ", XP = "―", QP = "─", eI = "𝒽", tI = "ℋ", nI = "ℏ", rI = "Ħ", oI = "ħ", sI = "≎", iI = "≏", aI = "⁃", lI = "‐", cI = "Í", uI = "í", dI = "⁣", fI = "Î", pI = "î", hI = "И", mI = "и", gI = "İ", yI = "Е", bI = "е", vI = "¡", kI = "⇔", xI = "𝔦", wI = "ℑ", SI = "Ì", CI = "ì", EI = "ⅈ", AI = "⨌", TI = "∭", OI = "⧜", MI = "℩", DI = "Ĳ", _I = "ĳ", NI = "Ī", RI = "ī", LI = "ℑ", PI = "ⅈ", II = "ℐ", BI = "ℑ", FI = "ı", qI = "ℑ", zI = "⊷", $I = "Ƶ", HI = "⇒", jI = "℅", VI = "∞", UI = "⧝", WI = "ı", KI = "⊺", JI = "∫", GI = "∬", ZI = "ℤ", YI = "∫", XI = "⊺", QI = "⋂", eB = "⨗", tB = "⨼", nB = "⁣", rB = "⁢", oB = "Ё", sB = "ё", iB = "Į", aB = "į", lB = "𝕀", cB = "𝕚", uB = "Ι", dB = "ι", fB = "⨼", pB = "¿", hB = "𝒾", mB = "ℐ", gB = "∈", yB = "⋵", bB = "⋹", vB = "⋴", kB = "⋳", xB = "∈", wB = "⁢", SB = "Ĩ", CB = "ĩ", EB = "І", AB = "і", TB = "Ï", OB = "ï", MB = "Ĵ", DB = "ĵ", _B = "Й", NB = "й", RB = "𝔍", LB = "𝔧", PB = "ȷ", IB = "𝕁", BB = "𝕛", FB = "𝒥", qB = "𝒿", zB = "Ј", $B = "ј", HB = "Є", jB = "є", VB = "Κ", UB = "κ", WB = "ϰ", KB = "Ķ", JB = "ķ", GB = "К", ZB = "к", YB = "𝔎", XB = "𝔨", QB = "ĸ", eF = "Х", tF = "х", nF = "Ќ", rF = "ќ", oF = "𝕂", sF = "𝕜", iF = "𝒦", aF = "𝓀", lF = "⇚", cF = "Ĺ", uF = "ĺ", dF = "⦴", fF = "ℒ", pF = "Λ", hF = "λ", mF = "⟨", gF = "⟪", yF = "⦑", bF = "⟨", vF = "⪅", kF = "ℒ", xF = "«", wF = "⇤", SF = "⤟", CF = "←", EF = "↞", AF = "⇐", TF = "⤝", OF = "↩", MF = "↫", DF = "⤹", _F = "⥳", NF = "↢", RF = "⤙", LF = "⤛", PF = "⪫", IF = "⪭", BF = "⪭︀", FF = "⤌", qF = "⤎", zF = "❲", $F = "{", HF = "[", jF = "⦋", VF = "⦏", UF = "⦍", WF = "Ľ", KF = "ľ", JF = "Ļ", GF = "ļ", ZF = "⌈", YF = "{", XF = "Л", QF = "л", eq = "⤶", tq = "“", nq = "„", rq = "⥧", oq = "⥋", sq = "↲", iq = "≤", aq = "≦", lq = "⟨", cq = "⇤", uq = "←", dq = "←", fq = "⇐", pq = "⇆", hq = "↢", mq = "⌈", gq = "⟦", yq = "⥡", bq = "⥙", vq = "⇃", kq = "⌊", xq = "↽", wq = "↼", Sq = "⇇", Cq = "↔", Eq = "↔", Aq = "⇔", Tq = "⇆", Oq = "⇋", Mq = "↭", Dq = "⥎", _q = "↤", Nq = "⊣", Rq = "⥚", Lq = "⋋", Pq = "⧏", Iq = "⊲", Bq = "⊴", Fq = "⥑", qq = "⥠", zq = "⥘", $q = "↿", Hq = "⥒", jq = "↼", Vq = "⪋", Uq = "⋚", Wq = "≤", Kq = "≦", Jq = "⩽", Gq = "⪨", Zq = "⩽", Yq = "⩿", Xq = "⪁", Qq = "⪃", e3 = "⋚︀", t3 = "⪓", n3 = "⪅", r3 = "⋖", o3 = "⋚", s3 = "⪋", i3 = "⋚", a3 = "≦", l3 = "≶", c3 = "≶", u3 = "⪡", d3 = "≲", f3 = "⩽", p3 = "≲", h3 = "⥼", m3 = "⌊", g3 = "𝔏", y3 = "𝔩", b3 = "≶", v3 = "⪑", k3 = "⥢", x3 = "↽", w3 = "↼", S3 = "⥪", C3 = "▄", E3 = "Љ", A3 = "љ", T3 = "⇇", O3 = "≪", M3 = "⋘", D3 = "⌞", _3 = "⇚", N3 = "⥫", R3 = "◺", L3 = "Ŀ", P3 = "ŀ", I3 = "⎰", B3 = "⎰", F3 = "⪉", q3 = "⪉", z3 = "⪇", $3 = "≨", H3 = "⪇", j3 = "≨", V3 = "⋦", U3 = "⟬", W3 = "⇽", K3 = "⟦", J3 = "⟵", G3 = "⟵", Z3 = "⟸", Y3 = "⟷", X3 = "⟷", Q3 = "⟺", ez = "⟼", tz = "⟶", nz = "⟶", rz = "⟹", oz = "↫", sz = "↬", iz = "⦅", az = "𝕃", lz = "𝕝", cz = "⨭", uz = "⨴", dz = "∗", fz = "_", pz = "↙", hz = "↘", mz = "◊", gz = "◊", yz = "⧫", bz = "(", vz = "⦓", kz = "⇆", xz = "⌟", wz = "⇋", Sz = "⥭", Cz = "‎", Ez = "⊿", Az = "‹", Tz = "𝓁", Oz = "ℒ", Mz = "↰", Dz = "↰", _z = "≲", Nz = "⪍", Rz = "⪏", Lz = "[", Pz = "‘", Iz = "‚", Bz = "Ł", Fz = "ł", qz = "⪦", zz = "⩹", $z = "<", Hz = "<", jz = "≪", Vz = "⋖", Uz = "⋋", Wz = "⋉", Kz = "⥶", Jz = "⩻", Gz = "◃", Zz = "⊴", Yz = "◂", Xz = "⦖", Qz = "⥊", e$ = "⥦", t$ = "≨︀", n$ = "≨︀", r$ = "¯", o$ = "♂", s$ = "✠", i$ = "✠", a$ = "↦", l$ = "↦", c$ = "↧", u$ = "↤", d$ = "↥", f$ = "▮", p$ = "⨩", h$ = "М", m$ = "м", g$ = "—", y$ = "∺", b$ = "∡", v$ = " ", k$ = "ℳ", x$ = "𝔐", w$ = "𝔪", S$ = "℧", C$ = "µ", E$ = "*", A$ = "⫰", T$ = "∣", O$ = "·", M$ = "⊟", D$ = "−", _$ = "∸", N$ = "⨪", R$ = "∓", L$ = "⫛", P$ = "…", I$ = "∓", B$ = "⊧", F$ = "𝕄", q$ = "𝕞", z$ = "∓", $$ = "𝓂", H$ = "ℳ", j$ = "∾", V$ = "Μ", U$ = "μ", W$ = "⊸", K$ = "⊸", J$ = "∇", G$ = "Ń", Z$ = "ń", Y$ = "∠⃒", X$ = "≉", Q$ = "⩰̸", eH = "≋̸", tH = "ŉ", nH = "≉", rH = "♮", oH = "ℕ", sH = "♮", iH = " ", aH = "≎̸", lH = "≏̸", cH = "⩃", uH = "Ň", dH = "ň", fH = "Ņ", pH = "ņ", hH = "≇", mH = "⩭̸", gH = "⩂", yH = "Н", bH = "н", vH = "–", kH = "⤤", xH = "↗", wH = "⇗", SH = "↗", CH = "≠", EH = "≐̸", AH = "​", TH = "​", OH = "​", MH = "​", DH = "≢", _H = "⤨", NH = "≂̸", RH = "≫", LH = "≪", PH = `
`, IH = "∄", BH = "∄", FH = "𝔑", qH = "𝔫", zH = "≧̸", $H = "≱", HH = "≱", jH = "≧̸", VH = "⩾̸", UH = "⩾̸", WH = "⋙̸", KH = "≵", JH = "≫⃒", GH = "≯", ZH = "≯", YH = "≫̸", XH = "↮", QH = "⇎", e4 = "⫲", t4 = "∋", n4 = "⋼", r4 = "⋺", o4 = "∋", s4 = "Њ", i4 = "њ", a4 = "↚", l4 = "⇍", c4 = "‥", u4 = "≦̸", d4 = "≰", f4 = "↚", p4 = "⇍", h4 = "↮", m4 = "⇎", g4 = "≰", y4 = "≦̸", b4 = "⩽̸", v4 = "⩽̸", k4 = "≮", x4 = "⋘̸", w4 = "≴", S4 = "≪⃒", C4 = "≮", E4 = "⋪", A4 = "⋬", T4 = "≪̸", O4 = "∤", M4 = "⁠", D4 = " ", _4 = "𝕟", N4 = "ℕ", R4 = "⫬", L4 = "¬", P4 = "≢", I4 = "≭", B4 = "∦", F4 = "∉", q4 = "≠", z4 = "≂̸", $4 = "∄", H4 = "≯", j4 = "≱", V4 = "≧̸", U4 = "≫̸", W4 = "≹", K4 = "⩾̸", J4 = "≵", G4 = "≎̸", Z4 = "≏̸", Y4 = "∉", X4 = "⋵̸", Q4 = "⋹̸", e5 = "∉", t5 = "⋷", n5 = "⋶", r5 = "⧏̸", o5 = "⋪", s5 = "⋬", i5 = "≮", a5 = "≰", l5 = "≸", c5 = "≪̸", u5 = "⩽̸", d5 = "≴", f5 = "⪢̸", p5 = "⪡̸", h5 = "∌", m5 = "∌", g5 = "⋾", y5 = "⋽", b5 = "⊀", v5 = "⪯̸", k5 = "⋠", x5 = "∌", w5 = "⧐̸", S5 = "⋫", C5 = "⋭", E5 = "⊏̸", A5 = "⋢", T5 = "⊐̸", O5 = "⋣", M5 = "⊂⃒", D5 = "⊈", _5 = "⊁", N5 = "⪰̸", R5 = "⋡", L5 = "≿̸", P5 = "⊃⃒", I5 = "⊉", B5 = "≁", F5 = "≄", q5 = "≇", z5 = "≉", $5 = "∤", H5 = "∦", j5 = "∦", V5 = "⫽⃥", U5 = "∂̸", W5 = "⨔", K5 = "⊀", J5 = "⋠", G5 = "⊀", Z5 = "⪯̸", Y5 = "⪯̸", X5 = "⤳̸", Q5 = "↛", ej = "⇏", tj = "↝̸", nj = "↛", rj = "⇏", oj = "⋫", sj = "⋭", ij = "⊁", aj = "⋡", lj = "⪰̸", cj = "𝒩", uj = "𝓃", dj = "∤", fj = "∦", pj = "≁", hj = "≄", mj = "≄", gj = "∤", yj = "∦", bj = "⋢", vj = "⋣", kj = "⊄", xj = "⫅̸", wj = "⊈", Sj = "⊂⃒", Cj = "⊈", Ej = "⫅̸", Aj = "⊁", Tj = "⪰̸", Oj = "⊅", Mj = "⫆̸", Dj = "⊉", _j = "⊃⃒", Nj = "⊉", Rj = "⫆̸", Lj = "≹", Pj = "Ñ", Ij = "ñ", Bj = "≸", Fj = "⋪", qj = "⋬", zj = "⋫", $j = "⋭", Hj = "Ν", jj = "ν", Vj = "#", Uj = "№", Wj = " ", Kj = "≍⃒", Jj = "⊬", Gj = "⊭", Zj = "⊮", Yj = "⊯", Xj = "≥⃒", Qj = ">⃒", eV = "⤄", tV = "⧞", nV = "⤂", rV = "≤⃒", oV = "<⃒", sV = "⊴⃒", iV = "⤃", aV = "⊵⃒", lV = "∼⃒", cV = "⤣", uV = "↖", dV = "⇖", fV = "↖", pV = "⤧", hV = "Ó", mV = "ó", gV = "⊛", yV = "Ô", bV = "ô", vV = "⊚", kV = "О", xV = "о", wV = "⊝", SV = "Ő", CV = "ő", EV = "⨸", AV = "⊙", TV = "⦼", OV = "Œ", MV = "œ", DV = "⦿", _V = "𝔒", NV = "𝔬", RV = "˛", LV = "Ò", PV = "ò", IV = "⧁", BV = "⦵", FV = "Ω", qV = "∮", zV = "↺", $V = "⦾", HV = "⦻", jV = "‾", VV = "⧀", UV = "Ō", WV = "ō", KV = "Ω", JV = "ω", GV = "Ο", ZV = "ο", YV = "⦶", XV = "⊖", QV = "𝕆", e6 = "𝕠", t6 = "⦷", n6 = "“", r6 = "‘", o6 = "⦹", s6 = "⊕", i6 = "↻", a6 = "⩔", l6 = "∨", c6 = "⩝", u6 = "ℴ", d6 = "ℴ", f6 = "ª", p6 = "º", h6 = "⊶", m6 = "⩖", g6 = "⩗", y6 = "⩛", b6 = "Ⓢ", v6 = "𝒪", k6 = "ℴ", x6 = "Ø", w6 = "ø", S6 = "⊘", C6 = "Õ", E6 = "õ", A6 = "⨶", T6 = "⨷", O6 = "⊗", M6 = "Ö", D6 = "ö", _6 = "⌽", N6 = "‾", R6 = "⏞", L6 = "⎴", P6 = "⏜", I6 = "¶", B6 = "∥", F6 = "∥", q6 = "⫳", z6 = "⫽", $6 = "∂", H6 = "∂", j6 = "П", V6 = "п", U6 = "%", W6 = ".", K6 = "‰", J6 = "⊥", G6 = "‱", Z6 = "𝔓", Y6 = "𝔭", X6 = "Φ", Q6 = "φ", eU = "ϕ", tU = "ℳ", nU = "☎", rU = "Π", oU = "π", sU = "⋔", iU = "ϖ", aU = "ℏ", lU = "ℎ", cU = "ℏ", uU = "⨣", dU = "⊞", fU = "⨢", pU = "+", hU = "∔", mU = "⨥", gU = "⩲", yU = "±", bU = "±", vU = "⨦", kU = "⨧", xU = "±", wU = "ℌ", SU = "⨕", CU = "𝕡", EU = "ℙ", AU = "£", TU = "⪷", OU = "⪻", MU = "≺", DU = "≼", _U = "⪷", NU = "≺", RU = "≼", LU = "≺", PU = "⪯", IU = "≼", BU = "≾", FU = "⪯", qU = "⪹", zU = "⪵", $U = "⋨", HU = "⪯", jU = "⪳", VU = "≾", UU = "′", WU = "″", KU = "ℙ", JU = "⪹", GU = "⪵", ZU = "⋨", YU = "∏", XU = "∏", QU = "⌮", e8 = "⌒", t8 = "⌓", n8 = "∝", r8 = "∝", o8 = "∷", s8 = "∝", i8 = "≾", a8 = "⊰", l8 = "𝒫", c8 = "𝓅", u8 = "Ψ", d8 = "ψ", f8 = " ", p8 = "𝔔", h8 = "𝔮", m8 = "⨌", g8 = "𝕢", y8 = "ℚ", b8 = "⁗", v8 = "𝒬", k8 = "𝓆", x8 = "ℍ", w8 = "⨖", S8 = "?", C8 = "≟", E8 = '"', A8 = '"', T8 = "⇛", O8 = "∽̱", M8 = "Ŕ", D8 = "ŕ", _8 = "√", N8 = "⦳", R8 = "⟩", L8 = "⟫", P8 = "⦒", I8 = "⦥", B8 = "⟩", F8 = "»", q8 = "⥵", z8 = "⇥", $8 = "⤠", H8 = "⤳", j8 = "→", V8 = "↠", U8 = "⇒", W8 = "⤞", K8 = "↪", J8 = "↬", G8 = "⥅", Z8 = "⥴", Y8 = "⤖", X8 = "↣", Q8 = "↝", e9 = "⤚", t9 = "⤜", n9 = "∶", r9 = "ℚ", o9 = "⤍", s9 = "⤏", i9 = "⤐", a9 = "❳", l9 = "}", c9 = "]", u9 = "⦌", d9 = "⦎", f9 = "⦐", p9 = "Ř", h9 = "ř", m9 = "Ŗ", g9 = "ŗ", y9 = "⌉", b9 = "}", v9 = "Р", k9 = "р", x9 = "⤷", w9 = "⥩", S9 = "”", C9 = "”", E9 = "↳", A9 = "ℜ", T9 = "ℛ", O9 = "ℜ", M9 = "ℝ", D9 = "ℜ", _9 = "▭", N9 = "®", R9 = "®", L9 = "∋", P9 = "⇋", I9 = "⥯", B9 = "⥽", F9 = "⌋", q9 = "𝔯", z9 = "ℜ", $9 = "⥤", H9 = "⇁", j9 = "⇀", V9 = "⥬", U9 = "Ρ", W9 = "ρ", K9 = "ϱ", J9 = "⟩", G9 = "⇥", Z9 = "→", Y9 = "→", X9 = "⇒", Q9 = "⇄", e7 = "↣", t7 = "⌉", n7 = "⟧", r7 = "⥝", o7 = "⥕", s7 = "⇂", i7 = "⌋", a7 = "⇁", l7 = "⇀", c7 = "⇄", u7 = "⇌", d7 = "⇉", f7 = "↝", p7 = "↦", h7 = "⊢", m7 = "⥛", g7 = "⋌", y7 = "⧐", b7 = "⊳", v7 = "⊵", k7 = "⥏", x7 = "⥜", w7 = "⥔", S7 = "↾", C7 = "⥓", E7 = "⇀", A7 = "˚", T7 = "≓", O7 = "⇄", M7 = "⇌", D7 = "‏", _7 = "⎱", N7 = "⎱", R7 = "⫮", L7 = "⟭", P7 = "⇾", I7 = "⟧", B7 = "⦆", F7 = "𝕣", q7 = "ℝ", z7 = "⨮", $7 = "⨵", H7 = "⥰", j7 = ")", V7 = "⦔", U7 = "⨒", W7 = "⇉", K7 = "⇛", J7 = "›", G7 = "𝓇", Z7 = "ℛ", Y7 = "↱", X7 = "↱", Q7 = "]", eW = "’", tW = "’", nW = "⋌", rW = "⋊", oW = "▹", sW = "⊵", iW = "▸", aW = "⧎", lW = "⧴", cW = "⥨", uW = "℞", dW = "Ś", fW = "ś", pW = "‚", hW = "⪸", mW = "Š", gW = "š", yW = "⪼", bW = "≻", vW = "≽", kW = "⪰", xW = "⪴", wW = "Ş", SW = "ş", CW = "Ŝ", EW = "ŝ", AW = "⪺", TW = "⪶", OW = "⋩", MW = "⨓", DW = "≿", _W = "С", NW = "с", RW = "⊡", LW = "⋅", PW = "⩦", IW = "⤥", BW = "↘", FW = "⇘", qW = "↘", zW = "§", $W = ";", HW = "⤩", jW = "∖", VW = "∖", UW = "✶", WW = "𝔖", KW = "𝔰", JW = "⌢", GW = "♯", ZW = "Щ", YW = "щ", XW = "Ш", QW = "ш", eK = "↓", tK = "←", nK = "∣", rK = "∥", oK = "→", sK = "↑", iK = "­", aK = "Σ", lK = "σ", cK = "ς", uK = "ς", dK = "∼", fK = "⩪", pK = "≃", hK = "≃", mK = "⪞", gK = "⪠", yK = "⪝", bK = "⪟", vK = "≆", kK = "⨤", xK = "⥲", wK = "←", SK = "∘", CK = "∖", EK = "⨳", AK = "⧤", TK = "∣", OK = "⌣", MK = "⪪", DK = "⪬", _K = "⪬︀", NK = "Ь", RK = "ь", LK = "⌿", PK = "⧄", IK = "/", BK = "𝕊", FK = "𝕤", qK = "♠", zK = "♠", $K = "∥", HK = "⊓", jK = "⊓︀", VK = "⊔", UK = "⊔︀", WK = "√", KK = "⊏", JK = "⊑", GK = "⊏", ZK = "⊑", YK = "⊐", XK = "⊒", QK = "⊐", eJ = "⊒", tJ = "□", nJ = "□", rJ = "⊓", oJ = "⊏", sJ = "⊑", iJ = "⊐", aJ = "⊒", lJ = "⊔", cJ = "▪", uJ = "□", dJ = "▪", fJ = "→", pJ = "𝒮", hJ = "𝓈", mJ = "∖", gJ = "⌣", yJ = "⋆", bJ = "⋆", vJ = "☆", kJ = "★", xJ = "ϵ", wJ = "ϕ", SJ = "¯", CJ = "⊂", EJ = "⋐", AJ = "⪽", TJ = "⫅", OJ = "⊆", MJ = "⫃", DJ = "⫁", _J = "⫋", NJ = "⊊", RJ = "⪿", LJ = "⥹", PJ = "⊂", IJ = "⋐", BJ = "⊆", FJ = "⫅", qJ = "⊆", zJ = "⊊", $J = "⫋", HJ = "⫇", jJ = "⫕", VJ = "⫓", UJ = "⪸", WJ = "≻", KJ = "≽", JJ = "≻", GJ = "⪰", ZJ = "≽", YJ = "≿", XJ = "⪰", QJ = "⪺", eG = "⪶", tG = "⋩", nG = "≿", rG = "∋", oG = "∑", sG = "∑", iG = "♪", aG = "¹", lG = "²", cG = "³", uG = "⊃", dG = "⋑", fG = "⪾", pG = "⫘", hG = "⫆", mG = "⊇", gG = "⫄", yG = "⊃", bG = "⊇", vG = "⟉", kG = "⫗", xG = "⥻", wG = "⫂", SG = "⫌", CG = "⊋", EG = "⫀", AG = "⊃", TG = "⋑", OG = "⊇", MG = "⫆", DG = "⊋", _G = "⫌", NG = "⫈", RG = "⫔", LG = "⫖", PG = "⤦", IG = "↙", BG = "⇙", FG = "↙", qG = "⤪", zG = "ß", $G = "	", HG = "⌖", jG = "Τ", VG = "τ", UG = "⎴", WG = "Ť", KG = "ť", JG = "Ţ", GG = "ţ", ZG = "Т", YG = "т", XG = "⃛", QG = "⌕", eZ = "𝔗", tZ = "𝔱", nZ = "∴", rZ = "∴", oZ = "∴", sZ = "Θ", iZ = "θ", aZ = "ϑ", lZ = "ϑ", cZ = "≈", uZ = "∼", dZ = "  ", fZ = " ", pZ = " ", hZ = "≈", mZ = "∼", gZ = "Þ", yZ = "þ", bZ = "˜", vZ = "∼", kZ = "≃", xZ = "≅", wZ = "≈", SZ = "⨱", CZ = "⊠", EZ = "×", AZ = "⨰", TZ = "∭", OZ = "⤨", MZ = "⌶", DZ = "⫱", _Z = "⊤", NZ = "𝕋", RZ = "𝕥", LZ = "⫚", PZ = "⤩", IZ = "‴", BZ = "™", FZ = "™", qZ = "▵", zZ = "▿", $Z = "◃", HZ = "⊴", jZ = "≜", VZ = "▹", UZ = "⊵", WZ = "◬", KZ = "≜", JZ = "⨺", GZ = "⃛", ZZ = "⨹", YZ = "⧍", XZ = "⨻", QZ = "⏢", eY = "𝒯", tY = "𝓉", nY = "Ц", rY = "ц", oY = "Ћ", sY = "ћ", iY = "Ŧ", aY = "ŧ", lY = "≬", cY = "↞", uY = "↠", dY = "Ú", fY = "ú", pY = "↑", hY = "↟", mY = "⇑", gY = "⥉", yY = "Ў", bY = "ў", vY = "Ŭ", kY = "ŭ", xY = "Û", wY = "û", SY = "У", CY = "у", EY = "⇅", AY = "Ű", TY = "ű", OY = "⥮", MY = "⥾", DY = "𝔘", _Y = "𝔲", NY = "Ù", RY = "ù", LY = "⥣", PY = "↿", IY = "↾", BY = "▀", FY = "⌜", qY = "⌜", zY = "⌏", $Y = "◸", HY = "Ū", jY = "ū", VY = "¨", UY = "_", WY = "⏟", KY = "⎵", JY = "⏝", GY = "⋃", ZY = "⊎", YY = "Ų", XY = "ų", QY = "𝕌", eX = "𝕦", tX = "⤒", nX = "↑", rX = "↑", oX = "⇑", sX = "⇅", iX = "↕", aX = "↕", lX = "⇕", cX = "⥮", uX = "↿", dX = "↾", fX = "⊎", pX = "↖", hX = "↗", mX = "υ", gX = "ϒ", yX = "ϒ", bX = "Υ", vX = "υ", kX = "↥", xX = "⊥", wX = "⇈", SX = "⌝", CX = "⌝", EX = "⌎", AX = "Ů", TX = "ů", OX = "◹", MX = "𝒰", DX = "𝓊", _X = "⋰", NX = "Ũ", RX = "ũ", LX = "▵", PX = "▴", IX = "⇈", BX = "Ü", FX = "ü", qX = "⦧", zX = "⦜", $X = "ϵ", HX = "ϰ", jX = "∅", VX = "ϕ", UX = "ϖ", WX = "∝", KX = "↕", JX = "⇕", GX = "ϱ", ZX = "ς", YX = "⊊︀", XX = "⫋︀", QX = "⊋︀", eQ = "⫌︀", tQ = "ϑ", nQ = "⊲", rQ = "⊳", oQ = "⫨", sQ = "⫫", iQ = "⫩", aQ = "В", lQ = "в", cQ = "⊢", uQ = "⊨", dQ = "⊩", fQ = "⊫", pQ = "⫦", hQ = "⊻", mQ = "∨", gQ = "⋁", yQ = "≚", bQ = "⋮", vQ = "|", kQ = "‖", xQ = "|", wQ = "‖", SQ = "∣", CQ = "|", EQ = "❘", AQ = "≀", TQ = " ", OQ = "𝔙", MQ = "𝔳", DQ = "⊲", _Q = "⊂⃒", NQ = "⊃⃒", RQ = "𝕍", LQ = "𝕧", PQ = "∝", IQ = "⊳", BQ = "𝒱", FQ = "𝓋", qQ = "⫋︀", zQ = "⊊︀", $Q = "⫌︀", HQ = "⊋︀", jQ = "⊪", VQ = "⦚", UQ = "Ŵ", WQ = "ŵ", KQ = "⩟", JQ = "∧", GQ = "⋀", ZQ = "≙", YQ = "℘", XQ = "𝔚", QQ = "𝔴", eee = "𝕎", tee = "𝕨", nee = "℘", ree = "≀", oee = "≀", see = "𝒲", iee = "𝓌", aee = "⋂", lee = "◯", cee = "⋃", uee = "▽", dee = "𝔛", fee = "𝔵", pee = "⟷", hee = "⟺", mee = "Ξ", gee = "ξ", yee = "⟵", bee = "⟸", vee = "⟼", kee = "⋻", xee = "⨀", wee = "𝕏", See = "𝕩", Cee = "⨁", Eee = "⨂", Aee = "⟶", Tee = "⟹", Oee = "𝒳", Mee = "𝓍", Dee = "⨆", _ee = "⨄", Nee = "△", Ree = "⋁", Lee = "⋀", Pee = "Ý", Iee = "ý", Bee = "Я", Fee = "я", qee = "Ŷ", zee = "ŷ", $ee = "Ы", Hee = "ы", jee = "¥", Vee = "𝔜", Uee = "𝔶", Wee = "Ї", Kee = "ї", Jee = "𝕐", Gee = "𝕪", Zee = "𝒴", Yee = "𝓎", Xee = "Ю", Qee = "ю", ete = "ÿ", tte = "Ÿ", nte = "Ź", rte = "ź", ote = "Ž", ste = "ž", ite = "З", ate = "з", lte = "Ż", cte = "ż", ute = "ℨ", dte = "​", fte = "Ζ", pte = "ζ", hte = "𝔷", mte = "ℨ", gte = "Ж", yte = "ж", bte = "⇝", vte = "𝕫", kte = "ℤ", xte = "𝒵", wte = "𝓏", Ste = "‍", Cte = "‌", Ete = {
  Aacute: lC,
  aacute: cC,
  Abreve: uC,
  abreve: dC,
  ac: fC,
  acd: pC,
  acE: hC,
  Acirc: mC,
  acirc: gC,
  acute: yC,
  Acy: bC,
  acy: vC,
  AElig: kC,
  aelig: xC,
  af: wC,
  Afr: SC,
  afr: CC,
  Agrave: EC,
  agrave: AC,
  alefsym: TC,
  aleph: OC,
  Alpha: MC,
  alpha: DC,
  Amacr: _C,
  amacr: NC,
  amalg: RC,
  amp: LC,
  AMP: PC,
  andand: IC,
  And: BC,
  and: FC,
  andd: qC,
  andslope: zC,
  andv: $C,
  ang: HC,
  ange: jC,
  angle: VC,
  angmsdaa: UC,
  angmsdab: WC,
  angmsdac: KC,
  angmsdad: JC,
  angmsdae: GC,
  angmsdaf: ZC,
  angmsdag: YC,
  angmsdah: XC,
  angmsd: QC,
  angrt: eE,
  angrtvb: tE,
  angrtvbd: nE,
  angsph: rE,
  angst: oE,
  angzarr: sE,
  Aogon: iE,
  aogon: aE,
  Aopf: lE,
  aopf: cE,
  apacir: uE,
  ap: dE,
  apE: fE,
  ape: pE,
  apid: hE,
  apos: mE,
  ApplyFunction: gE,
  approx: yE,
  approxeq: bE,
  Aring: vE,
  aring: kE,
  Ascr: xE,
  ascr: wE,
  Assign: SE,
  ast: CE,
  asymp: EE,
  asympeq: AE,
  Atilde: TE,
  atilde: OE,
  Auml: ME,
  auml: DE,
  awconint: _E,
  awint: NE,
  backcong: RE,
  backepsilon: LE,
  backprime: PE,
  backsim: IE,
  backsimeq: BE,
  Backslash: FE,
  Barv: qE,
  barvee: zE,
  barwed: $E,
  Barwed: HE,
  barwedge: jE,
  bbrk: VE,
  bbrktbrk: UE,
  bcong: WE,
  Bcy: KE,
  bcy: JE,
  bdquo: GE,
  becaus: ZE,
  because: YE,
  Because: XE,
  bemptyv: QE,
  bepsi: eA,
  bernou: tA,
  Bernoullis: nA,
  Beta: rA,
  beta: oA,
  beth: sA,
  between: iA,
  Bfr: aA,
  bfr: lA,
  bigcap: cA,
  bigcirc: uA,
  bigcup: dA,
  bigodot: fA,
  bigoplus: pA,
  bigotimes: hA,
  bigsqcup: mA,
  bigstar: gA,
  bigtriangledown: yA,
  bigtriangleup: bA,
  biguplus: vA,
  bigvee: kA,
  bigwedge: xA,
  bkarow: wA,
  blacklozenge: SA,
  blacksquare: CA,
  blacktriangle: EA,
  blacktriangledown: AA,
  blacktriangleleft: TA,
  blacktriangleright: OA,
  blank: MA,
  blk12: DA,
  blk14: _A,
  blk34: NA,
  block: RA,
  bne: LA,
  bnequiv: PA,
  bNot: IA,
  bnot: BA,
  Bopf: FA,
  bopf: qA,
  bot: zA,
  bottom: $A,
  bowtie: HA,
  boxbox: jA,
  boxdl: VA,
  boxdL: UA,
  boxDl: WA,
  boxDL: KA,
  boxdr: JA,
  boxdR: GA,
  boxDr: ZA,
  boxDR: YA,
  boxh: XA,
  boxH: QA,
  boxhd: eT,
  boxHd: tT,
  boxhD: nT,
  boxHD: rT,
  boxhu: oT,
  boxHu: sT,
  boxhU: iT,
  boxHU: aT,
  boxminus: lT,
  boxplus: cT,
  boxtimes: uT,
  boxul: dT,
  boxuL: fT,
  boxUl: pT,
  boxUL: hT,
  boxur: mT,
  boxuR: gT,
  boxUr: yT,
  boxUR: bT,
  boxv: vT,
  boxV: kT,
  boxvh: xT,
  boxvH: wT,
  boxVh: ST,
  boxVH: CT,
  boxvl: ET,
  boxvL: AT,
  boxVl: TT,
  boxVL: OT,
  boxvr: MT,
  boxvR: DT,
  boxVr: _T,
  boxVR: NT,
  bprime: RT,
  breve: LT,
  Breve: PT,
  brvbar: IT,
  bscr: BT,
  Bscr: FT,
  bsemi: qT,
  bsim: zT,
  bsime: $T,
  bsolb: HT,
  bsol: jT,
  bsolhsub: VT,
  bull: UT,
  bullet: WT,
  bump: KT,
  bumpE: JT,
  bumpe: GT,
  Bumpeq: ZT,
  bumpeq: YT,
  Cacute: XT,
  cacute: QT,
  capand: eO,
  capbrcup: tO,
  capcap: nO,
  cap: rO,
  Cap: oO,
  capcup: sO,
  capdot: iO,
  CapitalDifferentialD: aO,
  caps: lO,
  caret: cO,
  caron: uO,
  Cayleys: dO,
  ccaps: fO,
  Ccaron: pO,
  ccaron: hO,
  Ccedil: mO,
  ccedil: gO,
  Ccirc: yO,
  ccirc: bO,
  Cconint: vO,
  ccups: kO,
  ccupssm: xO,
  Cdot: wO,
  cdot: SO,
  cedil: CO,
  Cedilla: EO,
  cemptyv: AO,
  cent: TO,
  centerdot: OO,
  CenterDot: MO,
  cfr: DO,
  Cfr: _O,
  CHcy: NO,
  chcy: RO,
  check: LO,
  checkmark: PO,
  Chi: IO,
  chi: BO,
  circ: FO,
  circeq: qO,
  circlearrowleft: zO,
  circlearrowright: $O,
  circledast: HO,
  circledcirc: jO,
  circleddash: VO,
  CircleDot: UO,
  circledR: WO,
  circledS: KO,
  CircleMinus: JO,
  CirclePlus: GO,
  CircleTimes: ZO,
  cir: YO,
  cirE: XO,
  cire: QO,
  cirfnint: eM,
  cirmid: tM,
  cirscir: nM,
  ClockwiseContourIntegral: rM,
  CloseCurlyDoubleQuote: oM,
  CloseCurlyQuote: sM,
  clubs: iM,
  clubsuit: aM,
  colon: lM,
  Colon: cM,
  Colone: uM,
  colone: dM,
  coloneq: fM,
  comma: pM,
  commat: hM,
  comp: mM,
  compfn: gM,
  complement: yM,
  complexes: bM,
  cong: vM,
  congdot: kM,
  Congruent: xM,
  conint: wM,
  Conint: SM,
  ContourIntegral: CM,
  copf: EM,
  Copf: AM,
  coprod: TM,
  Coproduct: OM,
  copy: MM,
  COPY: DM,
  copysr: _M,
  CounterClockwiseContourIntegral: NM,
  crarr: RM,
  cross: LM,
  Cross: PM,
  Cscr: IM,
  cscr: BM,
  csub: FM,
  csube: qM,
  csup: zM,
  csupe: $M,
  ctdot: HM,
  cudarrl: jM,
  cudarrr: VM,
  cuepr: UM,
  cuesc: WM,
  cularr: KM,
  cularrp: JM,
  cupbrcap: GM,
  cupcap: ZM,
  CupCap: YM,
  cup: XM,
  Cup: QM,
  cupcup: eD,
  cupdot: tD,
  cupor: nD,
  cups: rD,
  curarr: oD,
  curarrm: sD,
  curlyeqprec: iD,
  curlyeqsucc: aD,
  curlyvee: lD,
  curlywedge: cD,
  curren: uD,
  curvearrowleft: dD,
  curvearrowright: fD,
  cuvee: pD,
  cuwed: hD,
  cwconint: mD,
  cwint: gD,
  cylcty: yD,
  dagger: bD,
  Dagger: vD,
  daleth: kD,
  darr: xD,
  Darr: wD,
  dArr: SD,
  dash: CD,
  Dashv: ED,
  dashv: AD,
  dbkarow: TD,
  dblac: OD,
  Dcaron: MD,
  dcaron: DD,
  Dcy: _D,
  dcy: ND,
  ddagger: RD,
  ddarr: LD,
  DD: PD,
  dd: ID,
  DDotrahd: BD,
  ddotseq: FD,
  deg: qD,
  Del: zD,
  Delta: $D,
  delta: HD,
  demptyv: jD,
  dfisht: VD,
  Dfr: UD,
  dfr: WD,
  dHar: KD,
  dharl: JD,
  dharr: GD,
  DiacriticalAcute: ZD,
  DiacriticalDot: YD,
  DiacriticalDoubleAcute: XD,
  DiacriticalGrave: QD,
  DiacriticalTilde: e_,
  diam: t_,
  diamond: n_,
  Diamond: r_,
  diamondsuit: o_,
  diams: s_,
  die: i_,
  DifferentialD: a_,
  digamma: l_,
  disin: c_,
  div: u_,
  divide: d_,
  divideontimes: f_,
  divonx: p_,
  DJcy: h_,
  djcy: m_,
  dlcorn: g_,
  dlcrop: y_,
  dollar: b_,
  Dopf: v_,
  dopf: k_,
  Dot: x_,
  dot: w_,
  DotDot: S_,
  doteq: C_,
  doteqdot: E_,
  DotEqual: A_,
  dotminus: T_,
  dotplus: O_,
  dotsquare: M_,
  doublebarwedge: D_,
  DoubleContourIntegral: __,
  DoubleDot: N_,
  DoubleDownArrow: R_,
  DoubleLeftArrow: L_,
  DoubleLeftRightArrow: P_,
  DoubleLeftTee: I_,
  DoubleLongLeftArrow: B_,
  DoubleLongLeftRightArrow: F_,
  DoubleLongRightArrow: q_,
  DoubleRightArrow: z_,
  DoubleRightTee: $_,
  DoubleUpArrow: H_,
  DoubleUpDownArrow: j_,
  DoubleVerticalBar: V_,
  DownArrowBar: U_,
  downarrow: W_,
  DownArrow: K_,
  Downarrow: J_,
  DownArrowUpArrow: G_,
  DownBreve: Z_,
  downdownarrows: Y_,
  downharpoonleft: X_,
  downharpoonright: Q_,
  DownLeftRightVector: e2,
  DownLeftTeeVector: t2,
  DownLeftVectorBar: n2,
  DownLeftVector: r2,
  DownRightTeeVector: o2,
  DownRightVectorBar: s2,
  DownRightVector: i2,
  DownTeeArrow: a2,
  DownTee: l2,
  drbkarow: c2,
  drcorn: u2,
  drcrop: d2,
  Dscr: f2,
  dscr: p2,
  DScy: h2,
  dscy: m2,
  dsol: g2,
  Dstrok: y2,
  dstrok: b2,
  dtdot: v2,
  dtri: k2,
  dtrif: x2,
  duarr: w2,
  duhar: S2,
  dwangle: C2,
  DZcy: E2,
  dzcy: A2,
  dzigrarr: T2,
  Eacute: O2,
  eacute: M2,
  easter: D2,
  Ecaron: _2,
  ecaron: N2,
  Ecirc: R2,
  ecirc: L2,
  ecir: P2,
  ecolon: I2,
  Ecy: B2,
  ecy: F2,
  eDDot: q2,
  Edot: z2,
  edot: $2,
  eDot: H2,
  ee: j2,
  efDot: V2,
  Efr: U2,
  efr: W2,
  eg: K2,
  Egrave: J2,
  egrave: G2,
  egs: Z2,
  egsdot: Y2,
  el: X2,
  Element: Q2,
  elinters: eN,
  ell: tN,
  els: nN,
  elsdot: rN,
  Emacr: oN,
  emacr: sN,
  empty: iN,
  emptyset: aN,
  EmptySmallSquare: lN,
  emptyv: cN,
  EmptyVerySmallSquare: uN,
  emsp13: dN,
  emsp14: fN,
  emsp: pN,
  ENG: hN,
  eng: mN,
  ensp: gN,
  Eogon: yN,
  eogon: bN,
  Eopf: vN,
  eopf: kN,
  epar: xN,
  eparsl: wN,
  eplus: SN,
  epsi: CN,
  Epsilon: EN,
  epsilon: AN,
  epsiv: TN,
  eqcirc: ON,
  eqcolon: MN,
  eqsim: DN,
  eqslantgtr: _N,
  eqslantless: NN,
  Equal: RN,
  equals: LN,
  EqualTilde: PN,
  equest: IN,
  Equilibrium: BN,
  equiv: FN,
  equivDD: qN,
  eqvparsl: zN,
  erarr: $N,
  erDot: HN,
  escr: jN,
  Escr: VN,
  esdot: UN,
  Esim: WN,
  esim: KN,
  Eta: JN,
  eta: GN,
  ETH: ZN,
  eth: YN,
  Euml: XN,
  euml: QN,
  euro: eR,
  excl: tR,
  exist: nR,
  Exists: rR,
  expectation: oR,
  exponentiale: sR,
  ExponentialE: iR,
  fallingdotseq: aR,
  Fcy: lR,
  fcy: cR,
  female: uR,
  ffilig: dR,
  fflig: fR,
  ffllig: pR,
  Ffr: hR,
  ffr: mR,
  filig: gR,
  FilledSmallSquare: yR,
  FilledVerySmallSquare: bR,
  fjlig: vR,
  flat: kR,
  fllig: xR,
  fltns: wR,
  fnof: SR,
  Fopf: CR,
  fopf: ER,
  forall: AR,
  ForAll: TR,
  fork: OR,
  forkv: MR,
  Fouriertrf: DR,
  fpartint: _R,
  frac12: NR,
  frac13: RR,
  frac14: LR,
  frac15: PR,
  frac16: IR,
  frac18: BR,
  frac23: FR,
  frac25: qR,
  frac34: zR,
  frac35: $R,
  frac38: HR,
  frac45: jR,
  frac56: VR,
  frac58: UR,
  frac78: WR,
  frasl: KR,
  frown: JR,
  fscr: GR,
  Fscr: ZR,
  gacute: YR,
  Gamma: XR,
  gamma: QR,
  Gammad: eL,
  gammad: tL,
  gap: nL,
  Gbreve: rL,
  gbreve: oL,
  Gcedil: sL,
  Gcirc: iL,
  gcirc: aL,
  Gcy: lL,
  gcy: cL,
  Gdot: uL,
  gdot: dL,
  ge: fL,
  gE: pL,
  gEl: hL,
  gel: mL,
  geq: gL,
  geqq: yL,
  geqslant: bL,
  gescc: vL,
  ges: kL,
  gesdot: xL,
  gesdoto: wL,
  gesdotol: SL,
  gesl: CL,
  gesles: EL,
  Gfr: AL,
  gfr: TL,
  gg: OL,
  Gg: ML,
  ggg: DL,
  gimel: _L,
  GJcy: NL,
  gjcy: RL,
  gla: LL,
  gl: PL,
  glE: IL,
  glj: BL,
  gnap: FL,
  gnapprox: qL,
  gne: zL,
  gnE: $L,
  gneq: HL,
  gneqq: jL,
  gnsim: VL,
  Gopf: UL,
  gopf: WL,
  grave: KL,
  GreaterEqual: JL,
  GreaterEqualLess: GL,
  GreaterFullEqual: ZL,
  GreaterGreater: YL,
  GreaterLess: XL,
  GreaterSlantEqual: QL,
  GreaterTilde: eP,
  Gscr: tP,
  gscr: nP,
  gsim: rP,
  gsime: oP,
  gsiml: sP,
  gtcc: iP,
  gtcir: aP,
  gt: lP,
  GT: cP,
  Gt: uP,
  gtdot: dP,
  gtlPar: fP,
  gtquest: pP,
  gtrapprox: hP,
  gtrarr: mP,
  gtrdot: gP,
  gtreqless: yP,
  gtreqqless: bP,
  gtrless: vP,
  gtrsim: kP,
  gvertneqq: xP,
  gvnE: wP,
  Hacek: SP,
  hairsp: CP,
  half: EP,
  hamilt: AP,
  HARDcy: TP,
  hardcy: OP,
  harrcir: MP,
  harr: DP,
  hArr: _P,
  harrw: NP,
  Hat: RP,
  hbar: LP,
  Hcirc: PP,
  hcirc: IP,
  hearts: BP,
  heartsuit: FP,
  hellip: qP,
  hercon: zP,
  hfr: $P,
  Hfr: HP,
  HilbertSpace: jP,
  hksearow: VP,
  hkswarow: UP,
  hoarr: WP,
  homtht: KP,
  hookleftarrow: JP,
  hookrightarrow: GP,
  hopf: ZP,
  Hopf: YP,
  horbar: XP,
  HorizontalLine: QP,
  hscr: eI,
  Hscr: tI,
  hslash: nI,
  Hstrok: rI,
  hstrok: oI,
  HumpDownHump: sI,
  HumpEqual: iI,
  hybull: aI,
  hyphen: lI,
  Iacute: cI,
  iacute: uI,
  ic: dI,
  Icirc: fI,
  icirc: pI,
  Icy: hI,
  icy: mI,
  Idot: gI,
  IEcy: yI,
  iecy: bI,
  iexcl: vI,
  iff: kI,
  ifr: xI,
  Ifr: wI,
  Igrave: SI,
  igrave: CI,
  ii: EI,
  iiiint: AI,
  iiint: TI,
  iinfin: OI,
  iiota: MI,
  IJlig: DI,
  ijlig: _I,
  Imacr: NI,
  imacr: RI,
  image: LI,
  ImaginaryI: PI,
  imagline: II,
  imagpart: BI,
  imath: FI,
  Im: qI,
  imof: zI,
  imped: $I,
  Implies: HI,
  incare: jI,
  in: "∈",
  infin: VI,
  infintie: UI,
  inodot: WI,
  intcal: KI,
  int: JI,
  Int: GI,
  integers: ZI,
  Integral: YI,
  intercal: XI,
  Intersection: QI,
  intlarhk: eB,
  intprod: tB,
  InvisibleComma: nB,
  InvisibleTimes: rB,
  IOcy: oB,
  iocy: sB,
  Iogon: iB,
  iogon: aB,
  Iopf: lB,
  iopf: cB,
  Iota: uB,
  iota: dB,
  iprod: fB,
  iquest: pB,
  iscr: hB,
  Iscr: mB,
  isin: gB,
  isindot: yB,
  isinE: bB,
  isins: vB,
  isinsv: kB,
  isinv: xB,
  it: wB,
  Itilde: SB,
  itilde: CB,
  Iukcy: EB,
  iukcy: AB,
  Iuml: TB,
  iuml: OB,
  Jcirc: MB,
  jcirc: DB,
  Jcy: _B,
  jcy: NB,
  Jfr: RB,
  jfr: LB,
  jmath: PB,
  Jopf: IB,
  jopf: BB,
  Jscr: FB,
  jscr: qB,
  Jsercy: zB,
  jsercy: $B,
  Jukcy: HB,
  jukcy: jB,
  Kappa: VB,
  kappa: UB,
  kappav: WB,
  Kcedil: KB,
  kcedil: JB,
  Kcy: GB,
  kcy: ZB,
  Kfr: YB,
  kfr: XB,
  kgreen: QB,
  KHcy: eF,
  khcy: tF,
  KJcy: nF,
  kjcy: rF,
  Kopf: oF,
  kopf: sF,
  Kscr: iF,
  kscr: aF,
  lAarr: lF,
  Lacute: cF,
  lacute: uF,
  laemptyv: dF,
  lagran: fF,
  Lambda: pF,
  lambda: hF,
  lang: mF,
  Lang: gF,
  langd: yF,
  langle: bF,
  lap: vF,
  Laplacetrf: kF,
  laquo: xF,
  larrb: wF,
  larrbfs: SF,
  larr: CF,
  Larr: EF,
  lArr: AF,
  larrfs: TF,
  larrhk: OF,
  larrlp: MF,
  larrpl: DF,
  larrsim: _F,
  larrtl: NF,
  latail: RF,
  lAtail: LF,
  lat: PF,
  late: IF,
  lates: BF,
  lbarr: FF,
  lBarr: qF,
  lbbrk: zF,
  lbrace: $F,
  lbrack: HF,
  lbrke: jF,
  lbrksld: VF,
  lbrkslu: UF,
  Lcaron: WF,
  lcaron: KF,
  Lcedil: JF,
  lcedil: GF,
  lceil: ZF,
  lcub: YF,
  Lcy: XF,
  lcy: QF,
  ldca: eq,
  ldquo: tq,
  ldquor: nq,
  ldrdhar: rq,
  ldrushar: oq,
  ldsh: sq,
  le: iq,
  lE: aq,
  LeftAngleBracket: lq,
  LeftArrowBar: cq,
  leftarrow: uq,
  LeftArrow: dq,
  Leftarrow: fq,
  LeftArrowRightArrow: pq,
  leftarrowtail: hq,
  LeftCeiling: mq,
  LeftDoubleBracket: gq,
  LeftDownTeeVector: yq,
  LeftDownVectorBar: bq,
  LeftDownVector: vq,
  LeftFloor: kq,
  leftharpoondown: xq,
  leftharpoonup: wq,
  leftleftarrows: Sq,
  leftrightarrow: Cq,
  LeftRightArrow: Eq,
  Leftrightarrow: Aq,
  leftrightarrows: Tq,
  leftrightharpoons: Oq,
  leftrightsquigarrow: Mq,
  LeftRightVector: Dq,
  LeftTeeArrow: _q,
  LeftTee: Nq,
  LeftTeeVector: Rq,
  leftthreetimes: Lq,
  LeftTriangleBar: Pq,
  LeftTriangle: Iq,
  LeftTriangleEqual: Bq,
  LeftUpDownVector: Fq,
  LeftUpTeeVector: qq,
  LeftUpVectorBar: zq,
  LeftUpVector: $q,
  LeftVectorBar: Hq,
  LeftVector: jq,
  lEg: Vq,
  leg: Uq,
  leq: Wq,
  leqq: Kq,
  leqslant: Jq,
  lescc: Gq,
  les: Zq,
  lesdot: Yq,
  lesdoto: Xq,
  lesdotor: Qq,
  lesg: e3,
  lesges: t3,
  lessapprox: n3,
  lessdot: r3,
  lesseqgtr: o3,
  lesseqqgtr: s3,
  LessEqualGreater: i3,
  LessFullEqual: a3,
  LessGreater: l3,
  lessgtr: c3,
  LessLess: u3,
  lesssim: d3,
  LessSlantEqual: f3,
  LessTilde: p3,
  lfisht: h3,
  lfloor: m3,
  Lfr: g3,
  lfr: y3,
  lg: b3,
  lgE: v3,
  lHar: k3,
  lhard: x3,
  lharu: w3,
  lharul: S3,
  lhblk: C3,
  LJcy: E3,
  ljcy: A3,
  llarr: T3,
  ll: O3,
  Ll: M3,
  llcorner: D3,
  Lleftarrow: _3,
  llhard: N3,
  lltri: R3,
  Lmidot: L3,
  lmidot: P3,
  lmoustache: I3,
  lmoust: B3,
  lnap: F3,
  lnapprox: q3,
  lne: z3,
  lnE: $3,
  lneq: H3,
  lneqq: j3,
  lnsim: V3,
  loang: U3,
  loarr: W3,
  lobrk: K3,
  longleftarrow: J3,
  LongLeftArrow: G3,
  Longleftarrow: Z3,
  longleftrightarrow: Y3,
  LongLeftRightArrow: X3,
  Longleftrightarrow: Q3,
  longmapsto: ez,
  longrightarrow: tz,
  LongRightArrow: nz,
  Longrightarrow: rz,
  looparrowleft: oz,
  looparrowright: sz,
  lopar: iz,
  Lopf: az,
  lopf: lz,
  loplus: cz,
  lotimes: uz,
  lowast: dz,
  lowbar: fz,
  LowerLeftArrow: pz,
  LowerRightArrow: hz,
  loz: mz,
  lozenge: gz,
  lozf: yz,
  lpar: bz,
  lparlt: vz,
  lrarr: kz,
  lrcorner: xz,
  lrhar: wz,
  lrhard: Sz,
  lrm: Cz,
  lrtri: Ez,
  lsaquo: Az,
  lscr: Tz,
  Lscr: Oz,
  lsh: Mz,
  Lsh: Dz,
  lsim: _z,
  lsime: Nz,
  lsimg: Rz,
  lsqb: Lz,
  lsquo: Pz,
  lsquor: Iz,
  Lstrok: Bz,
  lstrok: Fz,
  ltcc: qz,
  ltcir: zz,
  lt: $z,
  LT: Hz,
  Lt: jz,
  ltdot: Vz,
  lthree: Uz,
  ltimes: Wz,
  ltlarr: Kz,
  ltquest: Jz,
  ltri: Gz,
  ltrie: Zz,
  ltrif: Yz,
  ltrPar: Xz,
  lurdshar: Qz,
  luruhar: e$,
  lvertneqq: t$,
  lvnE: n$,
  macr: r$,
  male: o$,
  malt: s$,
  maltese: i$,
  Map: "⤅",
  map: a$,
  mapsto: l$,
  mapstodown: c$,
  mapstoleft: u$,
  mapstoup: d$,
  marker: f$,
  mcomma: p$,
  Mcy: h$,
  mcy: m$,
  mdash: g$,
  mDDot: y$,
  measuredangle: b$,
  MediumSpace: v$,
  Mellintrf: k$,
  Mfr: x$,
  mfr: w$,
  mho: S$,
  micro: C$,
  midast: E$,
  midcir: A$,
  mid: T$,
  middot: O$,
  minusb: M$,
  minus: D$,
  minusd: _$,
  minusdu: N$,
  MinusPlus: R$,
  mlcp: L$,
  mldr: P$,
  mnplus: I$,
  models: B$,
  Mopf: F$,
  mopf: q$,
  mp: z$,
  mscr: $$,
  Mscr: H$,
  mstpos: j$,
  Mu: V$,
  mu: U$,
  multimap: W$,
  mumap: K$,
  nabla: J$,
  Nacute: G$,
  nacute: Z$,
  nang: Y$,
  nap: X$,
  napE: Q$,
  napid: eH,
  napos: tH,
  napprox: nH,
  natural: rH,
  naturals: oH,
  natur: sH,
  nbsp: iH,
  nbump: aH,
  nbumpe: lH,
  ncap: cH,
  Ncaron: uH,
  ncaron: dH,
  Ncedil: fH,
  ncedil: pH,
  ncong: hH,
  ncongdot: mH,
  ncup: gH,
  Ncy: yH,
  ncy: bH,
  ndash: vH,
  nearhk: kH,
  nearr: xH,
  neArr: wH,
  nearrow: SH,
  ne: CH,
  nedot: EH,
  NegativeMediumSpace: AH,
  NegativeThickSpace: TH,
  NegativeThinSpace: OH,
  NegativeVeryThinSpace: MH,
  nequiv: DH,
  nesear: _H,
  nesim: NH,
  NestedGreaterGreater: RH,
  NestedLessLess: LH,
  NewLine: PH,
  nexist: IH,
  nexists: BH,
  Nfr: FH,
  nfr: qH,
  ngE: zH,
  nge: $H,
  ngeq: HH,
  ngeqq: jH,
  ngeqslant: VH,
  nges: UH,
  nGg: WH,
  ngsim: KH,
  nGt: JH,
  ngt: GH,
  ngtr: ZH,
  nGtv: YH,
  nharr: XH,
  nhArr: QH,
  nhpar: e4,
  ni: t4,
  nis: n4,
  nisd: r4,
  niv: o4,
  NJcy: s4,
  njcy: i4,
  nlarr: a4,
  nlArr: l4,
  nldr: c4,
  nlE: u4,
  nle: d4,
  nleftarrow: f4,
  nLeftarrow: p4,
  nleftrightarrow: h4,
  nLeftrightarrow: m4,
  nleq: g4,
  nleqq: y4,
  nleqslant: b4,
  nles: v4,
  nless: k4,
  nLl: x4,
  nlsim: w4,
  nLt: S4,
  nlt: C4,
  nltri: E4,
  nltrie: A4,
  nLtv: T4,
  nmid: O4,
  NoBreak: M4,
  NonBreakingSpace: D4,
  nopf: _4,
  Nopf: N4,
  Not: R4,
  not: L4,
  NotCongruent: P4,
  NotCupCap: I4,
  NotDoubleVerticalBar: B4,
  NotElement: F4,
  NotEqual: q4,
  NotEqualTilde: z4,
  NotExists: $4,
  NotGreater: H4,
  NotGreaterEqual: j4,
  NotGreaterFullEqual: V4,
  NotGreaterGreater: U4,
  NotGreaterLess: W4,
  NotGreaterSlantEqual: K4,
  NotGreaterTilde: J4,
  NotHumpDownHump: G4,
  NotHumpEqual: Z4,
  notin: Y4,
  notindot: X4,
  notinE: Q4,
  notinva: e5,
  notinvb: t5,
  notinvc: n5,
  NotLeftTriangleBar: r5,
  NotLeftTriangle: o5,
  NotLeftTriangleEqual: s5,
  NotLess: i5,
  NotLessEqual: a5,
  NotLessGreater: l5,
  NotLessLess: c5,
  NotLessSlantEqual: u5,
  NotLessTilde: d5,
  NotNestedGreaterGreater: f5,
  NotNestedLessLess: p5,
  notni: h5,
  notniva: m5,
  notnivb: g5,
  notnivc: y5,
  NotPrecedes: b5,
  NotPrecedesEqual: v5,
  NotPrecedesSlantEqual: k5,
  NotReverseElement: x5,
  NotRightTriangleBar: w5,
  NotRightTriangle: S5,
  NotRightTriangleEqual: C5,
  NotSquareSubset: E5,
  NotSquareSubsetEqual: A5,
  NotSquareSuperset: T5,
  NotSquareSupersetEqual: O5,
  NotSubset: M5,
  NotSubsetEqual: D5,
  NotSucceeds: _5,
  NotSucceedsEqual: N5,
  NotSucceedsSlantEqual: R5,
  NotSucceedsTilde: L5,
  NotSuperset: P5,
  NotSupersetEqual: I5,
  NotTilde: B5,
  NotTildeEqual: F5,
  NotTildeFullEqual: q5,
  NotTildeTilde: z5,
  NotVerticalBar: $5,
  nparallel: H5,
  npar: j5,
  nparsl: V5,
  npart: U5,
  npolint: W5,
  npr: K5,
  nprcue: J5,
  nprec: G5,
  npreceq: Z5,
  npre: Y5,
  nrarrc: X5,
  nrarr: Q5,
  nrArr: ej,
  nrarrw: tj,
  nrightarrow: nj,
  nRightarrow: rj,
  nrtri: oj,
  nrtrie: sj,
  nsc: ij,
  nsccue: aj,
  nsce: lj,
  Nscr: cj,
  nscr: uj,
  nshortmid: dj,
  nshortparallel: fj,
  nsim: pj,
  nsime: hj,
  nsimeq: mj,
  nsmid: gj,
  nspar: yj,
  nsqsube: bj,
  nsqsupe: vj,
  nsub: kj,
  nsubE: xj,
  nsube: wj,
  nsubset: Sj,
  nsubseteq: Cj,
  nsubseteqq: Ej,
  nsucc: Aj,
  nsucceq: Tj,
  nsup: Oj,
  nsupE: Mj,
  nsupe: Dj,
  nsupset: _j,
  nsupseteq: Nj,
  nsupseteqq: Rj,
  ntgl: Lj,
  Ntilde: Pj,
  ntilde: Ij,
  ntlg: Bj,
  ntriangleleft: Fj,
  ntrianglelefteq: qj,
  ntriangleright: zj,
  ntrianglerighteq: $j,
  Nu: Hj,
  nu: jj,
  num: Vj,
  numero: Uj,
  numsp: Wj,
  nvap: Kj,
  nvdash: Jj,
  nvDash: Gj,
  nVdash: Zj,
  nVDash: Yj,
  nvge: Xj,
  nvgt: Qj,
  nvHarr: eV,
  nvinfin: tV,
  nvlArr: nV,
  nvle: rV,
  nvlt: oV,
  nvltrie: sV,
  nvrArr: iV,
  nvrtrie: aV,
  nvsim: lV,
  nwarhk: cV,
  nwarr: uV,
  nwArr: dV,
  nwarrow: fV,
  nwnear: pV,
  Oacute: hV,
  oacute: mV,
  oast: gV,
  Ocirc: yV,
  ocirc: bV,
  ocir: vV,
  Ocy: kV,
  ocy: xV,
  odash: wV,
  Odblac: SV,
  odblac: CV,
  odiv: EV,
  odot: AV,
  odsold: TV,
  OElig: OV,
  oelig: MV,
  ofcir: DV,
  Ofr: _V,
  ofr: NV,
  ogon: RV,
  Ograve: LV,
  ograve: PV,
  ogt: IV,
  ohbar: BV,
  ohm: FV,
  oint: qV,
  olarr: zV,
  olcir: $V,
  olcross: HV,
  oline: jV,
  olt: VV,
  Omacr: UV,
  omacr: WV,
  Omega: KV,
  omega: JV,
  Omicron: GV,
  omicron: ZV,
  omid: YV,
  ominus: XV,
  Oopf: QV,
  oopf: e6,
  opar: t6,
  OpenCurlyDoubleQuote: n6,
  OpenCurlyQuote: r6,
  operp: o6,
  oplus: s6,
  orarr: i6,
  Or: a6,
  or: l6,
  ord: c6,
  order: u6,
  orderof: d6,
  ordf: f6,
  ordm: p6,
  origof: h6,
  oror: m6,
  orslope: g6,
  orv: y6,
  oS: b6,
  Oscr: v6,
  oscr: k6,
  Oslash: x6,
  oslash: w6,
  osol: S6,
  Otilde: C6,
  otilde: E6,
  otimesas: A6,
  Otimes: T6,
  otimes: O6,
  Ouml: M6,
  ouml: D6,
  ovbar: _6,
  OverBar: N6,
  OverBrace: R6,
  OverBracket: L6,
  OverParenthesis: P6,
  para: I6,
  parallel: B6,
  par: F6,
  parsim: q6,
  parsl: z6,
  part: $6,
  PartialD: H6,
  Pcy: j6,
  pcy: V6,
  percnt: U6,
  period: W6,
  permil: K6,
  perp: J6,
  pertenk: G6,
  Pfr: Z6,
  pfr: Y6,
  Phi: X6,
  phi: Q6,
  phiv: eU,
  phmmat: tU,
  phone: nU,
  Pi: rU,
  pi: oU,
  pitchfork: sU,
  piv: iU,
  planck: aU,
  planckh: lU,
  plankv: cU,
  plusacir: uU,
  plusb: dU,
  pluscir: fU,
  plus: pU,
  plusdo: hU,
  plusdu: mU,
  pluse: gU,
  PlusMinus: yU,
  plusmn: bU,
  plussim: vU,
  plustwo: kU,
  pm: xU,
  Poincareplane: wU,
  pointint: SU,
  popf: CU,
  Popf: EU,
  pound: AU,
  prap: TU,
  Pr: OU,
  pr: MU,
  prcue: DU,
  precapprox: _U,
  prec: NU,
  preccurlyeq: RU,
  Precedes: LU,
  PrecedesEqual: PU,
  PrecedesSlantEqual: IU,
  PrecedesTilde: BU,
  preceq: FU,
  precnapprox: qU,
  precneqq: zU,
  precnsim: $U,
  pre: HU,
  prE: jU,
  precsim: VU,
  prime: UU,
  Prime: WU,
  primes: KU,
  prnap: JU,
  prnE: GU,
  prnsim: ZU,
  prod: YU,
  Product: XU,
  profalar: QU,
  profline: e8,
  profsurf: t8,
  prop: n8,
  Proportional: r8,
  Proportion: o8,
  propto: s8,
  prsim: i8,
  prurel: a8,
  Pscr: l8,
  pscr: c8,
  Psi: u8,
  psi: d8,
  puncsp: f8,
  Qfr: p8,
  qfr: h8,
  qint: m8,
  qopf: g8,
  Qopf: y8,
  qprime: b8,
  Qscr: v8,
  qscr: k8,
  quaternions: x8,
  quatint: w8,
  quest: S8,
  questeq: C8,
  quot: E8,
  QUOT: A8,
  rAarr: T8,
  race: O8,
  Racute: M8,
  racute: D8,
  radic: _8,
  raemptyv: N8,
  rang: R8,
  Rang: L8,
  rangd: P8,
  range: I8,
  rangle: B8,
  raquo: F8,
  rarrap: q8,
  rarrb: z8,
  rarrbfs: $8,
  rarrc: H8,
  rarr: j8,
  Rarr: V8,
  rArr: U8,
  rarrfs: W8,
  rarrhk: K8,
  rarrlp: J8,
  rarrpl: G8,
  rarrsim: Z8,
  Rarrtl: Y8,
  rarrtl: X8,
  rarrw: Q8,
  ratail: e9,
  rAtail: t9,
  ratio: n9,
  rationals: r9,
  rbarr: o9,
  rBarr: s9,
  RBarr: i9,
  rbbrk: a9,
  rbrace: l9,
  rbrack: c9,
  rbrke: u9,
  rbrksld: d9,
  rbrkslu: f9,
  Rcaron: p9,
  rcaron: h9,
  Rcedil: m9,
  rcedil: g9,
  rceil: y9,
  rcub: b9,
  Rcy: v9,
  rcy: k9,
  rdca: x9,
  rdldhar: w9,
  rdquo: S9,
  rdquor: C9,
  rdsh: E9,
  real: A9,
  realine: T9,
  realpart: O9,
  reals: M9,
  Re: D9,
  rect: _9,
  reg: N9,
  REG: R9,
  ReverseElement: L9,
  ReverseEquilibrium: P9,
  ReverseUpEquilibrium: I9,
  rfisht: B9,
  rfloor: F9,
  rfr: q9,
  Rfr: z9,
  rHar: $9,
  rhard: H9,
  rharu: j9,
  rharul: V9,
  Rho: U9,
  rho: W9,
  rhov: K9,
  RightAngleBracket: J9,
  RightArrowBar: G9,
  rightarrow: Z9,
  RightArrow: Y9,
  Rightarrow: X9,
  RightArrowLeftArrow: Q9,
  rightarrowtail: e7,
  RightCeiling: t7,
  RightDoubleBracket: n7,
  RightDownTeeVector: r7,
  RightDownVectorBar: o7,
  RightDownVector: s7,
  RightFloor: i7,
  rightharpoondown: a7,
  rightharpoonup: l7,
  rightleftarrows: c7,
  rightleftharpoons: u7,
  rightrightarrows: d7,
  rightsquigarrow: f7,
  RightTeeArrow: p7,
  RightTee: h7,
  RightTeeVector: m7,
  rightthreetimes: g7,
  RightTriangleBar: y7,
  RightTriangle: b7,
  RightTriangleEqual: v7,
  RightUpDownVector: k7,
  RightUpTeeVector: x7,
  RightUpVectorBar: w7,
  RightUpVector: S7,
  RightVectorBar: C7,
  RightVector: E7,
  ring: A7,
  risingdotseq: T7,
  rlarr: O7,
  rlhar: M7,
  rlm: D7,
  rmoustache: _7,
  rmoust: N7,
  rnmid: R7,
  roang: L7,
  roarr: P7,
  robrk: I7,
  ropar: B7,
  ropf: F7,
  Ropf: q7,
  roplus: z7,
  rotimes: $7,
  RoundImplies: H7,
  rpar: j7,
  rpargt: V7,
  rppolint: U7,
  rrarr: W7,
  Rrightarrow: K7,
  rsaquo: J7,
  rscr: G7,
  Rscr: Z7,
  rsh: Y7,
  Rsh: X7,
  rsqb: Q7,
  rsquo: eW,
  rsquor: tW,
  rthree: nW,
  rtimes: rW,
  rtri: oW,
  rtrie: sW,
  rtrif: iW,
  rtriltri: aW,
  RuleDelayed: lW,
  ruluhar: cW,
  rx: uW,
  Sacute: dW,
  sacute: fW,
  sbquo: pW,
  scap: hW,
  Scaron: mW,
  scaron: gW,
  Sc: yW,
  sc: bW,
  sccue: vW,
  sce: kW,
  scE: xW,
  Scedil: wW,
  scedil: SW,
  Scirc: CW,
  scirc: EW,
  scnap: AW,
  scnE: TW,
  scnsim: OW,
  scpolint: MW,
  scsim: DW,
  Scy: _W,
  scy: NW,
  sdotb: RW,
  sdot: LW,
  sdote: PW,
  searhk: IW,
  searr: BW,
  seArr: FW,
  searrow: qW,
  sect: zW,
  semi: $W,
  seswar: HW,
  setminus: jW,
  setmn: VW,
  sext: UW,
  Sfr: WW,
  sfr: KW,
  sfrown: JW,
  sharp: GW,
  SHCHcy: ZW,
  shchcy: YW,
  SHcy: XW,
  shcy: QW,
  ShortDownArrow: eK,
  ShortLeftArrow: tK,
  shortmid: nK,
  shortparallel: rK,
  ShortRightArrow: oK,
  ShortUpArrow: sK,
  shy: iK,
  Sigma: aK,
  sigma: lK,
  sigmaf: cK,
  sigmav: uK,
  sim: dK,
  simdot: fK,
  sime: pK,
  simeq: hK,
  simg: mK,
  simgE: gK,
  siml: yK,
  simlE: bK,
  simne: vK,
  simplus: kK,
  simrarr: xK,
  slarr: wK,
  SmallCircle: SK,
  smallsetminus: CK,
  smashp: EK,
  smeparsl: AK,
  smid: TK,
  smile: OK,
  smt: MK,
  smte: DK,
  smtes: _K,
  SOFTcy: NK,
  softcy: RK,
  solbar: LK,
  solb: PK,
  sol: IK,
  Sopf: BK,
  sopf: FK,
  spades: qK,
  spadesuit: zK,
  spar: $K,
  sqcap: HK,
  sqcaps: jK,
  sqcup: VK,
  sqcups: UK,
  Sqrt: WK,
  sqsub: KK,
  sqsube: JK,
  sqsubset: GK,
  sqsubseteq: ZK,
  sqsup: YK,
  sqsupe: XK,
  sqsupset: QK,
  sqsupseteq: eJ,
  square: tJ,
  Square: nJ,
  SquareIntersection: rJ,
  SquareSubset: oJ,
  SquareSubsetEqual: sJ,
  SquareSuperset: iJ,
  SquareSupersetEqual: aJ,
  SquareUnion: lJ,
  squarf: cJ,
  squ: uJ,
  squf: dJ,
  srarr: fJ,
  Sscr: pJ,
  sscr: hJ,
  ssetmn: mJ,
  ssmile: gJ,
  sstarf: yJ,
  Star: bJ,
  star: vJ,
  starf: kJ,
  straightepsilon: xJ,
  straightphi: wJ,
  strns: SJ,
  sub: CJ,
  Sub: EJ,
  subdot: AJ,
  subE: TJ,
  sube: OJ,
  subedot: MJ,
  submult: DJ,
  subnE: _J,
  subne: NJ,
  subplus: RJ,
  subrarr: LJ,
  subset: PJ,
  Subset: IJ,
  subseteq: BJ,
  subseteqq: FJ,
  SubsetEqual: qJ,
  subsetneq: zJ,
  subsetneqq: $J,
  subsim: HJ,
  subsub: jJ,
  subsup: VJ,
  succapprox: UJ,
  succ: WJ,
  succcurlyeq: KJ,
  Succeeds: JJ,
  SucceedsEqual: GJ,
  SucceedsSlantEqual: ZJ,
  SucceedsTilde: YJ,
  succeq: XJ,
  succnapprox: QJ,
  succneqq: eG,
  succnsim: tG,
  succsim: nG,
  SuchThat: rG,
  sum: oG,
  Sum: sG,
  sung: iG,
  sup1: aG,
  sup2: lG,
  sup3: cG,
  sup: uG,
  Sup: dG,
  supdot: fG,
  supdsub: pG,
  supE: hG,
  supe: mG,
  supedot: gG,
  Superset: yG,
  SupersetEqual: bG,
  suphsol: vG,
  suphsub: kG,
  suplarr: xG,
  supmult: wG,
  supnE: SG,
  supne: CG,
  supplus: EG,
  supset: AG,
  Supset: TG,
  supseteq: OG,
  supseteqq: MG,
  supsetneq: DG,
  supsetneqq: _G,
  supsim: NG,
  supsub: RG,
  supsup: LG,
  swarhk: PG,
  swarr: IG,
  swArr: BG,
  swarrow: FG,
  swnwar: qG,
  szlig: zG,
  Tab: $G,
  target: HG,
  Tau: jG,
  tau: VG,
  tbrk: UG,
  Tcaron: WG,
  tcaron: KG,
  Tcedil: JG,
  tcedil: GG,
  Tcy: ZG,
  tcy: YG,
  tdot: XG,
  telrec: QG,
  Tfr: eZ,
  tfr: tZ,
  there4: nZ,
  therefore: rZ,
  Therefore: oZ,
  Theta: sZ,
  theta: iZ,
  thetasym: aZ,
  thetav: lZ,
  thickapprox: cZ,
  thicksim: uZ,
  ThickSpace: dZ,
  ThinSpace: fZ,
  thinsp: pZ,
  thkap: hZ,
  thksim: mZ,
  THORN: gZ,
  thorn: yZ,
  tilde: bZ,
  Tilde: vZ,
  TildeEqual: kZ,
  TildeFullEqual: xZ,
  TildeTilde: wZ,
  timesbar: SZ,
  timesb: CZ,
  times: EZ,
  timesd: AZ,
  tint: TZ,
  toea: OZ,
  topbot: MZ,
  topcir: DZ,
  top: _Z,
  Topf: NZ,
  topf: RZ,
  topfork: LZ,
  tosa: PZ,
  tprime: IZ,
  trade: BZ,
  TRADE: FZ,
  triangle: qZ,
  triangledown: zZ,
  triangleleft: $Z,
  trianglelefteq: HZ,
  triangleq: jZ,
  triangleright: VZ,
  trianglerighteq: UZ,
  tridot: WZ,
  trie: KZ,
  triminus: JZ,
  TripleDot: GZ,
  triplus: ZZ,
  trisb: YZ,
  tritime: XZ,
  trpezium: QZ,
  Tscr: eY,
  tscr: tY,
  TScy: nY,
  tscy: rY,
  TSHcy: oY,
  tshcy: sY,
  Tstrok: iY,
  tstrok: aY,
  twixt: lY,
  twoheadleftarrow: cY,
  twoheadrightarrow: uY,
  Uacute: dY,
  uacute: fY,
  uarr: pY,
  Uarr: hY,
  uArr: mY,
  Uarrocir: gY,
  Ubrcy: yY,
  ubrcy: bY,
  Ubreve: vY,
  ubreve: kY,
  Ucirc: xY,
  ucirc: wY,
  Ucy: SY,
  ucy: CY,
  udarr: EY,
  Udblac: AY,
  udblac: TY,
  udhar: OY,
  ufisht: MY,
  Ufr: DY,
  ufr: _Y,
  Ugrave: NY,
  ugrave: RY,
  uHar: LY,
  uharl: PY,
  uharr: IY,
  uhblk: BY,
  ulcorn: FY,
  ulcorner: qY,
  ulcrop: zY,
  ultri: $Y,
  Umacr: HY,
  umacr: jY,
  uml: VY,
  UnderBar: UY,
  UnderBrace: WY,
  UnderBracket: KY,
  UnderParenthesis: JY,
  Union: GY,
  UnionPlus: ZY,
  Uogon: YY,
  uogon: XY,
  Uopf: QY,
  uopf: eX,
  UpArrowBar: tX,
  uparrow: nX,
  UpArrow: rX,
  Uparrow: oX,
  UpArrowDownArrow: sX,
  updownarrow: iX,
  UpDownArrow: aX,
  Updownarrow: lX,
  UpEquilibrium: cX,
  upharpoonleft: uX,
  upharpoonright: dX,
  uplus: fX,
  UpperLeftArrow: pX,
  UpperRightArrow: hX,
  upsi: mX,
  Upsi: gX,
  upsih: yX,
  Upsilon: bX,
  upsilon: vX,
  UpTeeArrow: kX,
  UpTee: xX,
  upuparrows: wX,
  urcorn: SX,
  urcorner: CX,
  urcrop: EX,
  Uring: AX,
  uring: TX,
  urtri: OX,
  Uscr: MX,
  uscr: DX,
  utdot: _X,
  Utilde: NX,
  utilde: RX,
  utri: LX,
  utrif: PX,
  uuarr: IX,
  Uuml: BX,
  uuml: FX,
  uwangle: qX,
  vangrt: zX,
  varepsilon: $X,
  varkappa: HX,
  varnothing: jX,
  varphi: VX,
  varpi: UX,
  varpropto: WX,
  varr: KX,
  vArr: JX,
  varrho: GX,
  varsigma: ZX,
  varsubsetneq: YX,
  varsubsetneqq: XX,
  varsupsetneq: QX,
  varsupsetneqq: eQ,
  vartheta: tQ,
  vartriangleleft: nQ,
  vartriangleright: rQ,
  vBar: oQ,
  Vbar: sQ,
  vBarv: iQ,
  Vcy: aQ,
  vcy: lQ,
  vdash: cQ,
  vDash: uQ,
  Vdash: dQ,
  VDash: fQ,
  Vdashl: pQ,
  veebar: hQ,
  vee: mQ,
  Vee: gQ,
  veeeq: yQ,
  vellip: bQ,
  verbar: vQ,
  Verbar: kQ,
  vert: xQ,
  Vert: wQ,
  VerticalBar: SQ,
  VerticalLine: CQ,
  VerticalSeparator: EQ,
  VerticalTilde: AQ,
  VeryThinSpace: TQ,
  Vfr: OQ,
  vfr: MQ,
  vltri: DQ,
  vnsub: _Q,
  vnsup: NQ,
  Vopf: RQ,
  vopf: LQ,
  vprop: PQ,
  vrtri: IQ,
  Vscr: BQ,
  vscr: FQ,
  vsubnE: qQ,
  vsubne: zQ,
  vsupnE: $Q,
  vsupne: HQ,
  Vvdash: jQ,
  vzigzag: VQ,
  Wcirc: UQ,
  wcirc: WQ,
  wedbar: KQ,
  wedge: JQ,
  Wedge: GQ,
  wedgeq: ZQ,
  weierp: YQ,
  Wfr: XQ,
  wfr: QQ,
  Wopf: eee,
  wopf: tee,
  wp: nee,
  wr: ree,
  wreath: oee,
  Wscr: see,
  wscr: iee,
  xcap: aee,
  xcirc: lee,
  xcup: cee,
  xdtri: uee,
  Xfr: dee,
  xfr: fee,
  xharr: pee,
  xhArr: hee,
  Xi: mee,
  xi: gee,
  xlarr: yee,
  xlArr: bee,
  xmap: vee,
  xnis: kee,
  xodot: xee,
  Xopf: wee,
  xopf: See,
  xoplus: Cee,
  xotime: Eee,
  xrarr: Aee,
  xrArr: Tee,
  Xscr: Oee,
  xscr: Mee,
  xsqcup: Dee,
  xuplus: _ee,
  xutri: Nee,
  xvee: Ree,
  xwedge: Lee,
  Yacute: Pee,
  yacute: Iee,
  YAcy: Bee,
  yacy: Fee,
  Ycirc: qee,
  ycirc: zee,
  Ycy: $ee,
  ycy: Hee,
  yen: jee,
  Yfr: Vee,
  yfr: Uee,
  YIcy: Wee,
  yicy: Kee,
  Yopf: Jee,
  yopf: Gee,
  Yscr: Zee,
  yscr: Yee,
  YUcy: Xee,
  yucy: Qee,
  yuml: ete,
  Yuml: tte,
  Zacute: nte,
  zacute: rte,
  Zcaron: ote,
  zcaron: ste,
  Zcy: ite,
  zcy: ate,
  Zdot: lte,
  zdot: cte,
  zeetrf: ute,
  ZeroWidthSpace: dte,
  Zeta: fte,
  zeta: pte,
  zfr: hte,
  Zfr: mte,
  ZHcy: gte,
  zhcy: yte,
  zigrarr: bte,
  zopf: vte,
  Zopf: kte,
  Zscr: xte,
  zscr: wte,
  zwj: Ste,
  zwnj: Cte
};
var jm = Ete, Qc = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, Qr = {}, vf = {};
function Ate(n) {
  var e, t, r = vf[n];
  if (r)
    return r;
  for (r = vf[n] = [], e = 0; e < 128; e++)
    t = String.fromCharCode(e), /^[0-9a-z]$/i.test(t) ? r.push(t) : r.push("%" + ("0" + e.toString(16).toUpperCase()).slice(-2));
  for (e = 0; e < n.length; e++)
    r[n.charCodeAt(e)] = n[e];
  return r;
}
function Vi(n, e, t) {
  var r, o, s, i, a, l = "";
  for (typeof e != "string" && (t = e, e = Vi.defaultChars), typeof t > "u" && (t = !0), a = Ate(e), r = 0, o = n.length; r < o; r++) {
    if (s = n.charCodeAt(r), t && s === 37 && r + 2 < o && /^[0-9a-f]{2}$/i.test(n.slice(r + 1, r + 3))) {
      l += n.slice(r, r + 3), r += 2;
      continue;
    }
    if (s < 128) {
      l += a[s];
      continue;
    }
    if (s >= 55296 && s <= 57343) {
      if (s >= 55296 && s <= 56319 && r + 1 < o && (i = n.charCodeAt(r + 1), i >= 56320 && i <= 57343)) {
        l += encodeURIComponent(n[r] + n[r + 1]), r++;
        continue;
      }
      l += "%EF%BF%BD";
      continue;
    }
    l += encodeURIComponent(n[r]);
  }
  return l;
}
Vi.defaultChars = ";/?:@&=+$,-_.!~*'()#";
Vi.componentChars = "-_.!~*'()";
var Tte = Vi, kf = {};
function Ote(n) {
  var e, t, r = kf[n];
  if (r)
    return r;
  for (r = kf[n] = [], e = 0; e < 128; e++)
    t = String.fromCharCode(e), r.push(t);
  for (e = 0; e < n.length; e++)
    t = n.charCodeAt(e), r[t] = "%" + ("0" + t.toString(16).toUpperCase()).slice(-2);
  return r;
}
function Ui(n, e) {
  var t;
  return typeof e != "string" && (e = Ui.defaultChars), t = Ote(e), n.replace(/(%[a-f0-9]{2})+/gi, function(r) {
    var o, s, i, a, l, c, u, d = "";
    for (o = 0, s = r.length; o < s; o += 3) {
      if (i = parseInt(r.slice(o + 1, o + 3), 16), i < 128) {
        d += t[i];
        continue;
      }
      if ((i & 224) === 192 && o + 3 < s && (a = parseInt(r.slice(o + 4, o + 6), 16), (a & 192) === 128)) {
        u = i << 6 & 1984 | a & 63, u < 128 ? d += "��" : d += String.fromCharCode(u), o += 3;
        continue;
      }
      if ((i & 240) === 224 && o + 6 < s && (a = parseInt(r.slice(o + 4, o + 6), 16), l = parseInt(r.slice(o + 7, o + 9), 16), (a & 192) === 128 && (l & 192) === 128)) {
        u = i << 12 & 61440 | a << 6 & 4032 | l & 63, u < 2048 || u >= 55296 && u <= 57343 ? d += "���" : d += String.fromCharCode(u), o += 6;
        continue;
      }
      if ((i & 248) === 240 && o + 9 < s && (a = parseInt(r.slice(o + 4, o + 6), 16), l = parseInt(r.slice(o + 7, o + 9), 16), c = parseInt(r.slice(o + 10, o + 12), 16), (a & 192) === 128 && (l & 192) === 128 && (c & 192) === 128)) {
        u = i << 18 & 1835008 | a << 12 & 258048 | l << 6 & 4032 | c & 63, u < 65536 || u > 1114111 ? d += "����" : (u -= 65536, d += String.fromCharCode(55296 + (u >> 10), 56320 + (u & 1023))), o += 9;
        continue;
      }
      d += "�";
    }
    return d;
  });
}
Ui.defaultChars = ";/?:@&=+$,#";
Ui.componentChars = "";
var Mte = Ui, Dte = function(e) {
  var t = "";
  return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
};
function yi() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var _te = /^([a-z0-9.+-]+:)/i, Nte = /:[0-9]*$/, Rte = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, Lte = ["<", ">", '"', "`", " ", "\r", `
`, "	"], Pte = ["{", "}", "|", "\\", "^", "`"].concat(Lte), Ite = ["'"].concat(Pte), xf = ["%", "/", "?", ";", "#"].concat(Ite), wf = ["/", "?", "#"], Bte = 255, Sf = /^[+a-z0-9A-Z_-]{0,63}$/, Fte = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Cf = {
  javascript: !0,
  "javascript:": !0
}, Ef = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function qte(n, e) {
  if (n && n instanceof yi)
    return n;
  var t = new yi();
  return t.parse(n, e), t;
}
yi.prototype.parse = function(n, e) {
  var t, r, o, s, i, a = n;
  if (a = a.trim(), !e && n.split("#").length === 1) {
    var l = Rte.exec(a);
    if (l)
      return this.pathname = l[1], l[2] && (this.search = l[2]), this;
  }
  var c = _te.exec(a);
  if (c && (c = c[0], o = c.toLowerCase(), this.protocol = c, a = a.substr(c.length)), (e || c || a.match(/^\/\/[^@\/]+@[^@\/]+/)) && (i = a.substr(0, 2) === "//", i && !(c && Cf[c]) && (a = a.substr(2), this.slashes = !0)), !Cf[c] && (i || c && !Ef[c])) {
    var u = -1;
    for (t = 0; t < wf.length; t++)
      s = a.indexOf(wf[t]), s !== -1 && (u === -1 || s < u) && (u = s);
    var d, f;
    for (u === -1 ? f = a.lastIndexOf("@") : f = a.lastIndexOf("@", u), f !== -1 && (d = a.slice(0, f), a = a.slice(f + 1), this.auth = d), u = -1, t = 0; t < xf.length; t++)
      s = a.indexOf(xf[t]), s !== -1 && (u === -1 || s < u) && (u = s);
    u === -1 && (u = a.length), a[u - 1] === ":" && u--;
    var p = a.slice(0, u);
    a = a.slice(u), this.parseHost(p), this.hostname = this.hostname || "";
    var h = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!h) {
      var m = this.hostname.split(/\./);
      for (t = 0, r = m.length; t < r; t++) {
        var g = m[t];
        if (g && !g.match(Sf)) {
          for (var b = "", v = 0, x = g.length; v < x; v++)
            g.charCodeAt(v) > 127 ? b += "x" : b += g[v];
          if (!b.match(Sf)) {
            var y = m.slice(0, t), w = m.slice(t + 1), k = g.match(Fte);
            k && (y.push(k[1]), w.unshift(k[2])), w.length && (a = w.join(".") + a), this.hostname = y.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > Bte && (this.hostname = ""), h && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  var S = a.indexOf("#");
  S !== -1 && (this.hash = a.substr(S), a = a.slice(0, S));
  var E = a.indexOf("?");
  return E !== -1 && (this.search = a.substr(E), a = a.slice(0, E)), a && (this.pathname = a), Ef[o] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
yi.prototype.parseHost = function(n) {
  var e = Nte.exec(n);
  e && (e = e[0], e !== ":" && (this.port = e.substr(1)), n = n.substr(0, n.length - e.length)), n && (this.hostname = n);
};
var zte = qte;
Qr.encode = Tte;
Qr.decode = Mte;
Qr.format = Dte;
Qr.parse = zte;
var Rn = {}, Va, Af;
function Vm() {
  return Af || (Af = 1, Va = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), Va;
}
var Ua, Tf;
function Um() {
  return Tf || (Tf = 1, Ua = /[\0-\x1F\x7F-\x9F]/), Ua;
}
var Wa, Of;
function $te() {
  return Of || (Of = 1, Wa = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/), Wa;
}
var Ka, Mf;
function Wm() {
  return Mf || (Mf = 1, Ka = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/), Ka;
}
var Df;
function Hte() {
  return Df || (Df = 1, Rn.Any = Vm(), Rn.Cc = Um(), Rn.Cf = $te(), Rn.P = Qc, Rn.Z = Wm()), Rn;
}
(function(n) {
  function e(O) {
    return Object.prototype.toString.call(O);
  }
  function t(O) {
    return e(O) === "[object String]";
  }
  var r = Object.prototype.hasOwnProperty;
  function o(O, F) {
    return r.call(O, F);
  }
  function s(O) {
    var F = Array.prototype.slice.call(arguments, 1);
    return F.forEach(function(L) {
      if (L) {
        if (typeof L != "object")
          throw new TypeError(L + "must be object");
        Object.keys(L).forEach(function($) {
          O[$] = L[$];
        });
      }
    }), O;
  }
  function i(O, F, L) {
    return [].concat(O.slice(0, F), L, O.slice(F + 1));
  }
  function a(O) {
    return !(O >= 55296 && O <= 57343 || O >= 64976 && O <= 65007 || (O & 65535) === 65535 || (O & 65535) === 65534 || O >= 0 && O <= 8 || O === 11 || O >= 14 && O <= 31 || O >= 127 && O <= 159 || O > 1114111);
  }
  function l(O) {
    if (O > 65535) {
      O -= 65536;
      var F = 55296 + (O >> 10), L = 56320 + (O & 1023);
      return String.fromCharCode(F, L);
    }
    return String.fromCharCode(O);
  }
  var c = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, u = /&([a-z#][a-z0-9]{1,31});/gi, d = new RegExp(c.source + "|" + u.source, "gi"), f = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, p = jm;
  function h(O, F) {
    var L = 0;
    return o(p, F) ? p[F] : F.charCodeAt(0) === 35 && f.test(F) && (L = F[1].toLowerCase() === "x" ? parseInt(F.slice(2), 16) : parseInt(F.slice(1), 10), a(L)) ? l(L) : O;
  }
  function m(O) {
    return O.indexOf("\\") < 0 ? O : O.replace(c, "$1");
  }
  function g(O) {
    return O.indexOf("\\") < 0 && O.indexOf("&") < 0 ? O : O.replace(d, function(F, L, $) {
      return L || h(F, $);
    });
  }
  var b = /[&<>"]/, v = /[&<>"]/g, x = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
  function y(O) {
    return x[O];
  }
  function w(O) {
    return b.test(O) ? O.replace(v, y) : O;
  }
  var k = /[.?*+^$[\]\\(){}|-]/g;
  function S(O) {
    return O.replace(k, "\\$&");
  }
  function E(O) {
    switch (O) {
      case 9:
      case 32:
        return !0;
    }
    return !1;
  }
  function T(O) {
    if (O >= 8192 && O <= 8202)
      return !0;
    switch (O) {
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return !0;
    }
    return !1;
  }
  var D = Qc;
  function N(O) {
    return D.test(O);
  }
  function z(O) {
    switch (O) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return !0;
      default:
        return !1;
    }
  }
  function I(O) {
    return O = O.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (O = O.replace(/ẞ/g, "ß")), O.toLowerCase().toUpperCase();
  }
  n.lib = {}, n.lib.mdurl = Qr, n.lib.ucmicro = Hte(), n.assign = s, n.isString = t, n.has = o, n.unescapeMd = m, n.unescapeAll = g, n.isValidEntityCode = a, n.fromCodePoint = l, n.escapeHtml = w, n.arrayReplaceAt = i, n.isSpace = E, n.isWhiteSpace = T, n.isMdAsciiPunct = z, n.isPunctChar = N, n.escapeRE = S, n.normalizeReference = I;
})(ie);
var Wi = {}, jte = function(e, t, r) {
  var o, s, i, a, l = -1, c = e.posMax, u = e.pos;
  for (e.pos = t + 1, o = 1; e.pos < c; ) {
    if (i = e.src.charCodeAt(e.pos), i === 93 && (o--, o === 0)) {
      s = !0;
      break;
    }
    if (a = e.pos, e.md.inline.skipToken(e), i === 91) {
      if (a === e.pos - 1)
        o++;
      else if (r)
        return e.pos = u, -1;
    }
  }
  return s && (l = e.pos), e.pos = u, l;
}, _f = ie.unescapeAll, Vte = function(e, t, r) {
  var o, s, i = 0, a = t, l = {
    ok: !1,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (e.charCodeAt(t) === 60) {
    for (t++; t < r; ) {
      if (o = e.charCodeAt(t), o === 10 || o === 60)
        return l;
      if (o === 62)
        return l.pos = t + 1, l.str = _f(e.slice(a + 1, t)), l.ok = !0, l;
      if (o === 92 && t + 1 < r) {
        t += 2;
        continue;
      }
      t++;
    }
    return l;
  }
  for (s = 0; t < r && (o = e.charCodeAt(t), !(o === 32 || o < 32 || o === 127)); ) {
    if (o === 92 && t + 1 < r) {
      if (e.charCodeAt(t + 1) === 32)
        break;
      t += 2;
      continue;
    }
    if (o === 40 && (s++, s > 32))
      return l;
    if (o === 41) {
      if (s === 0)
        break;
      s--;
    }
    t++;
  }
  return a === t || s !== 0 || (l.str = _f(e.slice(a, t)), l.lines = i, l.pos = t, l.ok = !0), l;
}, Ute = ie.unescapeAll, Wte = function(e, t, r) {
  var o, s, i = 0, a = t, l = {
    ok: !1,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (t >= r || (s = e.charCodeAt(t), s !== 34 && s !== 39 && s !== 40))
    return l;
  for (t++, s === 40 && (s = 41); t < r; ) {
    if (o = e.charCodeAt(t), o === s)
      return l.pos = t + 1, l.lines = i, l.str = Ute(e.slice(a + 1, t)), l.ok = !0, l;
    if (o === 40 && s === 41)
      return l;
    o === 10 ? i++ : o === 92 && t + 1 < r && (t++, e.charCodeAt(t) === 10 && i++), t++;
  }
  return l;
};
Wi.parseLinkLabel = jte;
Wi.parseLinkDestination = Vte;
Wi.parseLinkTitle = Wte;
var Kte = ie.assign, Jte = ie.unescapeAll, cr = ie.escapeHtml, jt = {};
jt.code_inline = function(n, e, t, r, o) {
  var s = n[e];
  return "<code" + o.renderAttrs(s) + ">" + cr(n[e].content) + "</code>";
};
jt.code_block = function(n, e, t, r, o) {
  var s = n[e];
  return "<pre" + o.renderAttrs(s) + "><code>" + cr(n[e].content) + `</code></pre>
`;
};
jt.fence = function(n, e, t, r, o) {
  var s = n[e], i = s.info ? Jte(s.info).trim() : "", a = "", l = "", c, u, d, f, p;
  return i && (d = i.split(/(\s+)/g), a = d[0], l = d.slice(2).join("")), t.highlight ? c = t.highlight(s.content, a, l) || cr(s.content) : c = cr(s.content), c.indexOf("<pre") === 0 ? c + `
` : i ? (u = s.attrIndex("class"), f = s.attrs ? s.attrs.slice() : [], u < 0 ? f.push(["class", t.langPrefix + a]) : (f[u] = f[u].slice(), f[u][1] += " " + t.langPrefix + a), p = {
    attrs: f
  }, "<pre><code" + o.renderAttrs(p) + ">" + c + `</code></pre>
`) : "<pre><code" + o.renderAttrs(s) + ">" + c + `</code></pre>
`;
};
jt.image = function(n, e, t, r, o) {
  var s = n[e];
  return s.attrs[s.attrIndex("alt")][1] = o.renderInlineAsText(s.children, t, r), o.renderToken(n, e, t);
};
jt.hardbreak = function(n, e, t) {
  return t.xhtmlOut ? `<br />
` : `<br>
`;
};
jt.softbreak = function(n, e, t) {
  return t.breaks ? t.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
jt.text = function(n, e) {
  return cr(n[e].content);
};
jt.html_block = function(n, e) {
  return n[e].content;
};
jt.html_inline = function(n, e) {
  return n[e].content;
};
function eo() {
  this.rules = Kte({}, jt);
}
eo.prototype.renderAttrs = function(e) {
  var t, r, o;
  if (!e.attrs)
    return "";
  for (o = "", t = 0, r = e.attrs.length; t < r; t++)
    o += " " + cr(e.attrs[t][0]) + '="' + cr(e.attrs[t][1]) + '"';
  return o;
};
eo.prototype.renderToken = function(e, t, r) {
  var o, s = "", i = !1, a = e[t];
  return a.hidden ? "" : (a.block && a.nesting !== -1 && t && e[t - 1].hidden && (s += `
`), s += (a.nesting === -1 ? "</" : "<") + a.tag, s += this.renderAttrs(a), a.nesting === 0 && r.xhtmlOut && (s += " /"), a.block && (i = !0, a.nesting === 1 && t + 1 < e.length && (o = e[t + 1], (o.type === "inline" || o.hidden || o.nesting === -1 && o.tag === a.tag) && (i = !1))), s += i ? `>
` : ">", s);
};
eo.prototype.renderInline = function(n, e, t) {
  for (var r, o = "", s = this.rules, i = 0, a = n.length; i < a; i++)
    r = n[i].type, typeof s[r] < "u" ? o += s[r](n, i, e, t, this) : o += this.renderToken(n, i, e);
  return o;
};
eo.prototype.renderInlineAsText = function(n, e, t) {
  for (var r = "", o = 0, s = n.length; o < s; o++)
    n[o].type === "text" ? r += n[o].content : n[o].type === "image" ? r += this.renderInlineAsText(n[o].children, e, t) : n[o].type === "softbreak" && (r += `
`);
  return r;
};
eo.prototype.render = function(n, e, t) {
  var r, o, s, i = "", a = this.rules;
  for (r = 0, o = n.length; r < o; r++)
    s = n[r].type, s === "inline" ? i += this.renderInline(n[r].children, e, t) : typeof a[s] < "u" ? i += a[n[r].type](n, r, e, t, this) : i += this.renderToken(n, r, e, t);
  return i;
};
var Gte = eo;
function Tt() {
  this.__rules__ = [], this.__cache__ = null;
}
Tt.prototype.__find__ = function(n) {
  for (var e = 0; e < this.__rules__.length; e++)
    if (this.__rules__[e].name === n)
      return e;
  return -1;
};
Tt.prototype.__compile__ = function() {
  var n = this, e = [""];
  n.__rules__.forEach(function(t) {
    t.enabled && t.alt.forEach(function(r) {
      e.indexOf(r) < 0 && e.push(r);
    });
  }), n.__cache__ = {}, e.forEach(function(t) {
    n.__cache__[t] = [], n.__rules__.forEach(function(r) {
      r.enabled && (t && r.alt.indexOf(t) < 0 || n.__cache__[t].push(r.fn));
    });
  });
};
Tt.prototype.at = function(n, e, t) {
  var r = this.__find__(n), o = t || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + n);
  this.__rules__[r].fn = e, this.__rules__[r].alt = o.alt || [], this.__cache__ = null;
};
Tt.prototype.before = function(n, e, t, r) {
  var o = this.__find__(n), s = r || {};
  if (o === -1)
    throw new Error("Parser rule not found: " + n);
  this.__rules__.splice(o, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: s.alt || []
  }), this.__cache__ = null;
};
Tt.prototype.after = function(n, e, t, r) {
  var o = this.__find__(n), s = r || {};
  if (o === -1)
    throw new Error("Parser rule not found: " + n);
  this.__rules__.splice(o + 1, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: s.alt || []
  }), this.__cache__ = null;
};
Tt.prototype.push = function(n, e, t) {
  var r = t || {};
  this.__rules__.push({
    name: n,
    enabled: !0,
    fn: e,
    alt: r.alt || []
  }), this.__cache__ = null;
};
Tt.prototype.enable = function(n, e) {
  Array.isArray(n) || (n = [n]);
  var t = [];
  return n.forEach(function(r) {
    var o = this.__find__(r);
    if (o < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[o].enabled = !0, t.push(r);
  }, this), this.__cache__ = null, t;
};
Tt.prototype.enableOnly = function(n, e) {
  Array.isArray(n) || (n = [n]), this.__rules__.forEach(function(t) {
    t.enabled = !1;
  }), this.enable(n, e);
};
Tt.prototype.disable = function(n, e) {
  Array.isArray(n) || (n = [n]);
  var t = [];
  return n.forEach(function(r) {
    var o = this.__find__(r);
    if (o < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[o].enabled = !1, t.push(r);
  }, this), this.__cache__ = null, t;
};
Tt.prototype.getRules = function(n) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[n] || [];
};
var eu = Tt, Zte = /\r\n?|\n/g, Yte = /\0/g, Xte = function(e) {
  var t;
  t = e.src.replace(Zte, `
`), t = t.replace(Yte, "�"), e.src = t;
}, Qte = function(e) {
  var t;
  e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}, ene = function(e) {
  var t = e.tokens, r, o, s;
  for (o = 0, s = t.length; o < s; o++)
    r = t[o], r.type === "inline" && e.md.inline.parse(r.content, e.md, e.env, r.children);
}, tne = ie.arrayReplaceAt;
function nne(n) {
  return /^<a[>\s]/i.test(n);
}
function rne(n) {
  return /^<\/a\s*>/i.test(n);
}
var one = function(e) {
  var t, r, o, s, i, a, l, c, u, d, f, p, h, m, g, b, v = e.tokens, x;
  if (e.md.options.linkify) {
    for (r = 0, o = v.length; r < o; r++)
      if (!(v[r].type !== "inline" || !e.md.linkify.pretest(v[r].content)))
        for (s = v[r].children, h = 0, t = s.length - 1; t >= 0; t--) {
          if (a = s[t], a.type === "link_close") {
            for (t--; s[t].level !== a.level && s[t].type !== "link_open"; )
              t--;
            continue;
          }
          if (a.type === "html_inline" && (nne(a.content) && h > 0 && h--, rne(a.content) && h++), !(h > 0) && a.type === "text" && e.md.linkify.test(a.content)) {
            for (u = a.content, x = e.md.linkify.match(u), l = [], p = a.level, f = 0, x.length > 0 && x[0].index === 0 && t > 0 && s[t - 1].type === "text_special" && (x = x.slice(1)), c = 0; c < x.length; c++)
              m = x[c].url, g = e.md.normalizeLink(m), e.md.validateLink(g) && (b = x[c].text, x[c].schema ? x[c].schema === "mailto:" && !/^mailto:/i.test(b) ? b = e.md.normalizeLinkText("mailto:" + b).replace(/^mailto:/, "") : b = e.md.normalizeLinkText(b) : b = e.md.normalizeLinkText("http://" + b).replace(/^http:\/\//, ""), d = x[c].index, d > f && (i = new e.Token("text", "", 0), i.content = u.slice(f, d), i.level = p, l.push(i)), i = new e.Token("link_open", "a", 1), i.attrs = [["href", g]], i.level = p++, i.markup = "linkify", i.info = "auto", l.push(i), i = new e.Token("text", "", 0), i.content = b, i.level = p, l.push(i), i = new e.Token("link_close", "a", -1), i.level = --p, i.markup = "linkify", i.info = "auto", l.push(i), f = x[c].lastIndex);
            f < u.length && (i = new e.Token("text", "", 0), i.content = u.slice(f), i.level = p, l.push(i)), v[r].children = s = tne(s, t, l);
          }
        }
  }
}, Km = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, sne = /\((c|tm|r)\)/i, ine = /\((c|tm|r)\)/ig, ane = {
  c: "©",
  r: "®",
  tm: "™"
};
function lne(n, e) {
  return ane[e.toLowerCase()];
}
function cne(n) {
  var e, t, r = 0;
  for (e = n.length - 1; e >= 0; e--)
    t = n[e], t.type === "text" && !r && (t.content = t.content.replace(ine, lne)), t.type === "link_open" && t.info === "auto" && r--, t.type === "link_close" && t.info === "auto" && r++;
}
function une(n) {
  var e, t, r = 0;
  for (e = n.length - 1; e >= 0; e--)
    t = n[e], t.type === "text" && !r && Km.test(t.content) && (t.content = t.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), t.type === "link_open" && t.info === "auto" && r--, t.type === "link_close" && t.info === "auto" && r++;
}
var dne = function(e) {
  var t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type === "inline" && (sne.test(e.tokens[t].content) && cne(e.tokens[t].children), Km.test(e.tokens[t].content) && une(e.tokens[t].children));
}, Nf = ie.isWhiteSpace, Rf = ie.isPunctChar, Lf = ie.isMdAsciiPunct, fne = /['"]/, Pf = /['"]/g, If = "’";
function Es(n, e, t) {
  return n.slice(0, e) + t + n.slice(e + 1);
}
function pne(n, e) {
  var t, r, o, s, i, a, l, c, u, d, f, p, h, m, g, b, v, x, y, w, k;
  for (y = [], t = 0; t < n.length; t++) {
    for (r = n[t], l = n[t].level, v = y.length - 1; v >= 0 && !(y[v].level <= l); v--)
      ;
    if (y.length = v + 1, r.type === "text") {
      o = r.content, i = 0, a = o.length;
      e:
        for (; i < a && (Pf.lastIndex = i, s = Pf.exec(o), !!s); ) {
          if (g = b = !0, i = s.index + 1, x = s[0] === "'", u = 32, s.index - 1 >= 0)
            u = o.charCodeAt(s.index - 1);
          else
            for (v = t - 1; v >= 0 && !(n[v].type === "softbreak" || n[v].type === "hardbreak"); v--)
              if (n[v].content) {
                u = n[v].content.charCodeAt(n[v].content.length - 1);
                break;
              }
          if (d = 32, i < a)
            d = o.charCodeAt(i);
          else
            for (v = t + 1; v < n.length && !(n[v].type === "softbreak" || n[v].type === "hardbreak"); v++)
              if (n[v].content) {
                d = n[v].content.charCodeAt(0);
                break;
              }
          if (f = Lf(u) || Rf(String.fromCharCode(u)), p = Lf(d) || Rf(String.fromCharCode(d)), h = Nf(u), m = Nf(d), m ? g = !1 : p && (h || f || (g = !1)), h ? b = !1 : f && (m || p || (b = !1)), d === 34 && s[0] === '"' && u >= 48 && u <= 57 && (b = g = !1), g && b && (g = f, b = p), !g && !b) {
            x && (r.content = Es(r.content, s.index, If));
            continue;
          }
          if (b) {
            for (v = y.length - 1; v >= 0 && (c = y[v], !(y[v].level < l)); v--)
              if (c.single === x && y[v].level === l) {
                c = y[v], x ? (w = e.md.options.quotes[2], k = e.md.options.quotes[3]) : (w = e.md.options.quotes[0], k = e.md.options.quotes[1]), r.content = Es(r.content, s.index, k), n[c.token].content = Es(
                  n[c.token].content,
                  c.pos,
                  w
                ), i += k.length - 1, c.token === t && (i += w.length - 1), o = r.content, a = o.length, y.length = v;
                continue e;
              }
          }
          g ? y.push({
            token: t,
            pos: s.index,
            single: x,
            level: l
          }) : b && x && (r.content = Es(r.content, s.index, If));
        }
    }
  }
}
var hne = function(e) {
  var t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type !== "inline" || !fne.test(e.tokens[t].content) || pne(e.tokens[t].children, e);
}, mne = function(e) {
  var t, r, o, s, i, a, l = e.tokens;
  for (t = 0, r = l.length; t < r; t++)
    if (l[t].type === "inline") {
      for (o = l[t].children, i = o.length, s = 0; s < i; s++)
        o[s].type === "text_special" && (o[s].type = "text");
      for (s = a = 0; s < i; s++)
        o[s].type === "text" && s + 1 < i && o[s + 1].type === "text" ? o[s + 1].content = o[s].content + o[s + 1].content : (s !== a && (o[a] = o[s]), a++);
      s !== a && (o.length = a);
    }
};
function to(n, e, t) {
  this.type = n, this.tag = e, this.attrs = null, this.map = null, this.nesting = t, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
to.prototype.attrIndex = function(e) {
  var t, r, o;
  if (!this.attrs)
    return -1;
  for (t = this.attrs, r = 0, o = t.length; r < o; r++)
    if (t[r][0] === e)
      return r;
  return -1;
};
to.prototype.attrPush = function(e) {
  this.attrs ? this.attrs.push(e) : this.attrs = [e];
};
to.prototype.attrSet = function(e, t) {
  var r = this.attrIndex(e), o = [e, t];
  r < 0 ? this.attrPush(o) : this.attrs[r] = o;
};
to.prototype.attrGet = function(e) {
  var t = this.attrIndex(e), r = null;
  return t >= 0 && (r = this.attrs[t][1]), r;
};
to.prototype.attrJoin = function(e, t) {
  var r = this.attrIndex(e);
  r < 0 ? this.attrPush([e, t]) : this.attrs[r][1] = this.attrs[r][1] + " " + t;
};
var tu = to, gne = tu;
function Jm(n, e, t) {
  this.src = n, this.env = t, this.tokens = [], this.inlineMode = !1, this.md = e;
}
Jm.prototype.Token = gne;
var yne = Jm, bne = eu, Ja = [
  ["normalize", Xte],
  ["block", Qte],
  ["inline", ene],
  ["linkify", one],
  ["replacements", dne],
  ["smartquotes", hne],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", mne]
];
function nu() {
  this.ruler = new bne();
  for (var n = 0; n < Ja.length; n++)
    this.ruler.push(Ja[n][0], Ja[n][1]);
}
nu.prototype.process = function(n) {
  var e, t, r;
  for (r = this.ruler.getRules(""), e = 0, t = r.length; e < t; e++)
    r[e](n);
};
nu.prototype.State = yne;
var vne = nu, Ga = ie.isSpace;
function Za(n, e) {
  var t = n.bMarks[e] + n.tShift[e], r = n.eMarks[e];
  return n.src.slice(t, r);
}
function Bf(n) {
  var e = [], t = 0, r = n.length, o, s = !1, i = 0, a = "";
  for (o = n.charCodeAt(t); t < r; )
    o === 124 && (s ? (a += n.substring(i, t - 1), i = t) : (e.push(a + n.substring(i, t)), a = "", i = t + 1)), s = o === 92, t++, o = n.charCodeAt(t);
  return e.push(a + n.substring(i)), e;
}
var kne = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f, p, h, m, g, b, v, x, y, w, k;
  if (t + 2 > r || (u = t + 1, e.sCount[u] < e.blkIndent) || e.sCount[u] - e.blkIndent >= 4 || (a = e.bMarks[u] + e.tShift[u], a >= e.eMarks[u]) || (w = e.src.charCodeAt(a++), w !== 124 && w !== 45 && w !== 58) || a >= e.eMarks[u] || (k = e.src.charCodeAt(a++), k !== 124 && k !== 45 && k !== 58 && !Ga(k)) || w === 45 && Ga(k))
    return !1;
  for (; a < e.eMarks[u]; ) {
    if (s = e.src.charCodeAt(a), s !== 124 && s !== 45 && s !== 58 && !Ga(s))
      return !1;
    a++;
  }
  for (i = Za(e, t + 1), d = i.split("|"), h = [], l = 0; l < d.length; l++) {
    if (m = d[l].trim(), !m) {
      if (l === 0 || l === d.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(m))
      return !1;
    m.charCodeAt(m.length - 1) === 58 ? h.push(m.charCodeAt(0) === 58 ? "center" : "right") : m.charCodeAt(0) === 58 ? h.push("left") : h.push("");
  }
  if (i = Za(e, t).trim(), i.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4 || (d = Bf(i), d.length && d[0] === "" && d.shift(), d.length && d[d.length - 1] === "" && d.pop(), f = d.length, f === 0 || f !== h.length))
    return !1;
  if (o)
    return !0;
  for (v = e.parentType, e.parentType = "table", y = e.md.block.ruler.getRules("blockquote"), p = e.push("table_open", "table", 1), p.map = g = [t, 0], p = e.push("thead_open", "thead", 1), p.map = [t, t + 1], p = e.push("tr_open", "tr", 1), p.map = [t, t + 1], l = 0; l < d.length; l++)
    p = e.push("th_open", "th", 1), h[l] && (p.attrs = [["style", "text-align:" + h[l]]]), p = e.push("inline", "", 0), p.content = d[l].trim(), p.children = [], p = e.push("th_close", "th", -1);
  for (p = e.push("tr_close", "tr", -1), p = e.push("thead_close", "thead", -1), u = t + 2; u < r && !(e.sCount[u] < e.blkIndent); u++) {
    for (x = !1, l = 0, c = y.length; l < c; l++)
      if (y[l](e, u, r, !0)) {
        x = !0;
        break;
      }
    if (x || (i = Za(e, u).trim(), !i) || e.sCount[u] - e.blkIndent >= 4)
      break;
    for (d = Bf(i), d.length && d[0] === "" && d.shift(), d.length && d[d.length - 1] === "" && d.pop(), u === t + 2 && (p = e.push("tbody_open", "tbody", 1), p.map = b = [t + 2, 0]), p = e.push("tr_open", "tr", 1), p.map = [u, u + 1], l = 0; l < f; l++)
      p = e.push("td_open", "td", 1), h[l] && (p.attrs = [["style", "text-align:" + h[l]]]), p = e.push("inline", "", 0), p.content = d[l] ? d[l].trim() : "", p.children = [], p = e.push("td_close", "td", -1);
    p = e.push("tr_close", "tr", -1);
  }
  return b && (p = e.push("tbody_close", "tbody", -1), b[1] = u), p = e.push("table_close", "table", -1), g[1] = u, e.parentType = v, e.line = u, !0;
}, xne = function(e, t, r) {
  var o, s, i;
  if (e.sCount[t] - e.blkIndent < 4)
    return !1;
  for (s = o = t + 1; o < r; ) {
    if (e.isEmpty(o)) {
      o++;
      continue;
    }
    if (e.sCount[o] - e.blkIndent >= 4) {
      o++, s = o;
      continue;
    }
    break;
  }
  return e.line = s, i = e.push("code_block", "code", 0), i.content = e.getLines(t, s, 4 + e.blkIndent, !1) + `
`, i.map = [t, e.line], !0;
}, wne = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f = !1, p = e.bMarks[t] + e.tShift[t], h = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || p + 3 > h || (s = e.src.charCodeAt(p), s !== 126 && s !== 96) || (c = p, p = e.skipChars(p, s), i = p - c, i < 3) || (d = e.src.slice(c, p), a = e.src.slice(p, h), s === 96 && a.indexOf(String.fromCharCode(s)) >= 0))
    return !1;
  if (o)
    return !0;
  for (l = t; l++, !(l >= r || (p = c = e.bMarks[l] + e.tShift[l], h = e.eMarks[l], p < h && e.sCount[l] < e.blkIndent)); )
    if (e.src.charCodeAt(p) === s && !(e.sCount[l] - e.blkIndent >= 4) && (p = e.skipChars(p, s), !(p - c < i) && (p = e.skipSpaces(p), !(p < h)))) {
      f = !0;
      break;
    }
  return i = e.sCount[t], e.line = l + (f ? 1 : 0), u = e.push("fence", "code", 0), u.info = a, u.content = e.getLines(t + 1, l, i, !0), u.markup = d, u.map = [t, e.line], !0;
}, Ff = ie.isSpace, Sne = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f, p, h, m, g, b, v, x, y, w, k, S, E, T = e.lineMax, D = e.bMarks[t] + e.tShift[t], N = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(D++) !== 62)
    return !1;
  if (o)
    return !0;
  for (l = p = e.sCount[t] + 1, e.src.charCodeAt(D) === 32 ? (D++, l++, p++, s = !1, y = !0) : e.src.charCodeAt(D) === 9 ? (y = !0, (e.bsCount[t] + p) % 4 === 3 ? (D++, l++, p++, s = !1) : s = !0) : y = !1, h = [e.bMarks[t]], e.bMarks[t] = D; D < N && (i = e.src.charCodeAt(D), Ff(i)); ) {
    i === 9 ? p += 4 - (p + e.bsCount[t] + (s ? 1 : 0)) % 4 : p++;
    D++;
  }
  for (m = [e.bsCount[t]], e.bsCount[t] = e.sCount[t] + 1 + (y ? 1 : 0), u = D >= N, v = [e.sCount[t]], e.sCount[t] = p - l, x = [e.tShift[t]], e.tShift[t] = D - e.bMarks[t], k = e.md.block.ruler.getRules("blockquote"), b = e.parentType, e.parentType = "blockquote", f = t + 1; f < r && (E = e.sCount[f] < e.blkIndent, D = e.bMarks[f] + e.tShift[f], N = e.eMarks[f], !(D >= N)); f++) {
    if (e.src.charCodeAt(D++) === 62 && !E) {
      for (l = p = e.sCount[f] + 1, e.src.charCodeAt(D) === 32 ? (D++, l++, p++, s = !1, y = !0) : e.src.charCodeAt(D) === 9 ? (y = !0, (e.bsCount[f] + p) % 4 === 3 ? (D++, l++, p++, s = !1) : s = !0) : y = !1, h.push(e.bMarks[f]), e.bMarks[f] = D; D < N && (i = e.src.charCodeAt(D), Ff(i)); ) {
        i === 9 ? p += 4 - (p + e.bsCount[f] + (s ? 1 : 0)) % 4 : p++;
        D++;
      }
      u = D >= N, m.push(e.bsCount[f]), e.bsCount[f] = e.sCount[f] + 1 + (y ? 1 : 0), v.push(e.sCount[f]), e.sCount[f] = p - l, x.push(e.tShift[f]), e.tShift[f] = D - e.bMarks[f];
      continue;
    }
    if (u)
      break;
    for (w = !1, a = 0, c = k.length; a < c; a++)
      if (k[a](e, f, r, !0)) {
        w = !0;
        break;
      }
    if (w) {
      e.lineMax = f, e.blkIndent !== 0 && (h.push(e.bMarks[f]), m.push(e.bsCount[f]), x.push(e.tShift[f]), v.push(e.sCount[f]), e.sCount[f] -= e.blkIndent);
      break;
    }
    h.push(e.bMarks[f]), m.push(e.bsCount[f]), x.push(e.tShift[f]), v.push(e.sCount[f]), e.sCount[f] = -1;
  }
  for (g = e.blkIndent, e.blkIndent = 0, S = e.push("blockquote_open", "blockquote", 1), S.markup = ">", S.map = d = [t, 0], e.md.block.tokenize(e, t, f), S = e.push("blockquote_close", "blockquote", -1), S.markup = ">", e.lineMax = T, e.parentType = b, d[1] = e.line, a = 0; a < x.length; a++)
    e.bMarks[a + t] = h[a], e.tShift[a + t] = x[a], e.sCount[a + t] = v[a], e.bsCount[a + t] = m[a];
  return e.blkIndent = g, !0;
}, Cne = ie.isSpace, Ene = function(e, t, r, o) {
  var s, i, a, l, c = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || (s = e.src.charCodeAt(c++), s !== 42 && s !== 45 && s !== 95))
    return !1;
  for (i = 1; c < u; ) {
    if (a = e.src.charCodeAt(c++), a !== s && !Cne(a))
      return !1;
    a === s && i++;
  }
  return i < 3 ? !1 : (o || (e.line = t + 1, l = e.push("hr", "hr", 0), l.map = [t, e.line], l.markup = Array(i + 1).join(String.fromCharCode(s))), !0);
}, Gm = ie.isSpace;
function qf(n, e) {
  var t, r, o, s;
  return r = n.bMarks[e] + n.tShift[e], o = n.eMarks[e], t = n.src.charCodeAt(r++), t !== 42 && t !== 45 && t !== 43 || r < o && (s = n.src.charCodeAt(r), !Gm(s)) ? -1 : r;
}
function zf(n, e) {
  var t, r = n.bMarks[e] + n.tShift[e], o = r, s = n.eMarks[e];
  if (o + 1 >= s || (t = n.src.charCodeAt(o++), t < 48 || t > 57))
    return -1;
  for (; ; ) {
    if (o >= s)
      return -1;
    if (t = n.src.charCodeAt(o++), t >= 48 && t <= 57) {
      if (o - r >= 10)
        return -1;
      continue;
    }
    if (t === 41 || t === 46)
      break;
    return -1;
  }
  return o < s && (t = n.src.charCodeAt(o), !Gm(t)) ? -1 : o;
}
function Ane(n, e) {
  var t, r, o = n.level + 2;
  for (t = e + 2, r = n.tokens.length - 2; t < r; t++)
    n.tokens[t].level === o && n.tokens[t].type === "paragraph_open" && (n.tokens[t + 2].hidden = !0, n.tokens[t].hidden = !0, t += 2);
}
var Tne = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f, p, h, m, g, b, v, x, y, w, k, S, E, T, D, N, z, I, O, F, L, $ = !1, ee = !0;
  if (e.sCount[t] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[t] - e.listIndent >= 4 && e.sCount[t] < e.blkIndent)
    return !1;
  if (o && e.parentType === "paragraph" && e.sCount[t] >= e.blkIndent && ($ = !0), (N = zf(e, t)) >= 0) {
    if (d = !0, I = e.bMarks[t] + e.tShift[t], b = Number(e.src.slice(I, N - 1)), $ && b !== 1)
      return !1;
  } else if ((N = qf(e, t)) >= 0)
    d = !1;
  else
    return !1;
  if ($ && e.skipSpaces(N) >= e.eMarks[t])
    return !1;
  if (g = e.src.charCodeAt(N - 1), o)
    return !0;
  for (m = e.tokens.length, d ? (L = e.push("ordered_list_open", "ol", 1), b !== 1 && (L.attrs = [["start", b]])) : L = e.push("bullet_list_open", "ul", 1), L.map = h = [t, 0], L.markup = String.fromCharCode(g), x = t, z = !1, F = e.md.block.ruler.getRules("list"), k = e.parentType, e.parentType = "list"; x < r; ) {
    for (D = N, v = e.eMarks[x], u = y = e.sCount[x] + N - (e.bMarks[t] + e.tShift[t]); D < v; ) {
      if (s = e.src.charCodeAt(D), s === 9)
        y += 4 - (y + e.bsCount[x]) % 4;
      else if (s === 32)
        y++;
      else
        break;
      D++;
    }
    if (i = D, i >= v ? c = 1 : c = y - u, c > 4 && (c = 1), l = u + c, L = e.push("list_item_open", "li", 1), L.markup = String.fromCharCode(g), L.map = f = [t, 0], d && (L.info = e.src.slice(I, N - 1)), T = e.tight, E = e.tShift[t], S = e.sCount[t], w = e.listIndent, e.listIndent = e.blkIndent, e.blkIndent = l, e.tight = !0, e.tShift[t] = i - e.bMarks[t], e.sCount[t] = y, i >= v && e.isEmpty(t + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, t, r, !0), (!e.tight || z) && (ee = !1), z = e.line - t > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = w, e.tShift[t] = E, e.sCount[t] = S, e.tight = T, L = e.push("list_item_close", "li", -1), L.markup = String.fromCharCode(g), x = t = e.line, f[1] = x, i = e.bMarks[t], x >= r || e.sCount[x] < e.blkIndent || e.sCount[t] - e.blkIndent >= 4)
      break;
    for (O = !1, a = 0, p = F.length; a < p; a++)
      if (F[a](e, x, r, !0)) {
        O = !0;
        break;
      }
    if (O)
      break;
    if (d) {
      if (N = zf(e, x), N < 0)
        break;
      I = e.bMarks[x] + e.tShift[x];
    } else if (N = qf(e, x), N < 0)
      break;
    if (g !== e.src.charCodeAt(N - 1))
      break;
  }
  return d ? L = e.push("ordered_list_close", "ol", -1) : L = e.push("bullet_list_close", "ul", -1), L.markup = String.fromCharCode(g), h[1] = x, e.line = x, e.parentType = k, ee && Ane(e, m), !0;
}, One = ie.normalizeReference, As = ie.isSpace, Mne = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f, p, h, m, g, b, v, x, y, w = 0, k = e.bMarks[t] + e.tShift[t], S = e.eMarks[t], E = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(k) !== 91)
    return !1;
  for (; ++k < S; )
    if (e.src.charCodeAt(k) === 93 && e.src.charCodeAt(k - 1) !== 92) {
      if (k + 1 === S || e.src.charCodeAt(k + 1) !== 58)
        return !1;
      break;
    }
  for (l = e.lineMax, x = e.md.block.ruler.getRules("reference"), h = e.parentType, e.parentType = "reference"; E < l && !e.isEmpty(E); E++)
    if (!(e.sCount[E] - e.blkIndent > 3) && !(e.sCount[E] < 0)) {
      for (v = !1, u = 0, d = x.length; u < d; u++)
        if (x[u](e, E, l, !0)) {
          v = !0;
          break;
        }
      if (v)
        break;
    }
  for (b = e.getLines(t, E, e.blkIndent, !1).trim(), S = b.length, k = 1; k < S; k++) {
    if (s = b.charCodeAt(k), s === 91)
      return !1;
    if (s === 93) {
      p = k;
      break;
    } else
      s === 10 ? w++ : s === 92 && (k++, k < S && b.charCodeAt(k) === 10 && w++);
  }
  if (p < 0 || b.charCodeAt(p + 1) !== 58)
    return !1;
  for (k = p + 2; k < S; k++)
    if (s = b.charCodeAt(k), s === 10)
      w++;
    else if (!As(s))
      break;
  if (m = e.md.helpers.parseLinkDestination(b, k, S), !m.ok || (c = e.md.normalizeLink(m.str), !e.md.validateLink(c)))
    return !1;
  for (k = m.pos, w += m.lines, i = k, a = w, g = k; k < S; k++)
    if (s = b.charCodeAt(k), s === 10)
      w++;
    else if (!As(s))
      break;
  for (m = e.md.helpers.parseLinkTitle(b, k, S), k < S && g !== k && m.ok ? (y = m.str, k = m.pos, w += m.lines) : (y = "", k = i, w = a); k < S && (s = b.charCodeAt(k), !!As(s)); )
    k++;
  if (k < S && b.charCodeAt(k) !== 10 && y)
    for (y = "", k = i, w = a; k < S && (s = b.charCodeAt(k), !!As(s)); )
      k++;
  return k < S && b.charCodeAt(k) !== 10 || (f = One(b.slice(1, p)), !f) ? !1 : (o || (typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[f] > "u" && (e.env.references[f] = { title: y, href: c }), e.parentType = h, e.line = t + w + 1), !0);
}, Dne = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "source",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Ki = {}, _ne = "[a-zA-Z_:][a-zA-Z0-9:._-]*", Nne = "[^\"'=<>`\\x00-\\x20]+", Rne = "'[^']*'", Lne = '"[^"]*"', Pne = "(?:" + Nne + "|" + Rne + "|" + Lne + ")", Ine = "(?:\\s+" + _ne + "(?:\\s*=\\s*" + Pne + ")?)", Zm = "<[A-Za-z][A-Za-z0-9\\-]*" + Ine + "*\\s*\\/?>", Ym = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", Bne = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", Fne = "<[?][\\s\\S]*?[?]>", qne = "<![A-Z]+\\s+[^>]*>", zne = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", $ne = new RegExp("^(?:" + Zm + "|" + Ym + "|" + Bne + "|" + Fne + "|" + qne + "|" + zne + ")"), Hne = new RegExp("^(?:" + Zm + "|" + Ym + ")");
Ki.HTML_TAG_RE = $ne;
Ki.HTML_OPEN_CLOSE_TAG_RE = Hne;
var jne = Dne, Vne = Ki.HTML_OPEN_CLOSE_TAG_RE, xr = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + jne.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(Vne.source + "\\s*$"), /^$/, !1]
], Une = function(e, t, r, o) {
  var s, i, a, l, c = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(c) !== 60)
    return !1;
  for (l = e.src.slice(c, u), s = 0; s < xr.length && !xr[s][0].test(l); s++)
    ;
  if (s === xr.length)
    return !1;
  if (o)
    return xr[s][2];
  if (i = t + 1, !xr[s][1].test(l)) {
    for (; i < r && !(e.sCount[i] < e.blkIndent); i++)
      if (c = e.bMarks[i] + e.tShift[i], u = e.eMarks[i], l = e.src.slice(c, u), xr[s][1].test(l)) {
        l.length !== 0 && i++;
        break;
      }
  }
  return e.line = i, a = e.push("html_block", "", 0), a.map = [t, i], a.content = e.getLines(t, i, e.blkIndent, !0), !0;
}, $f = ie.isSpace, Wne = function(e, t, r, o) {
  var s, i, a, l, c = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || (s = e.src.charCodeAt(c), s !== 35 || c >= u))
    return !1;
  for (i = 1, s = e.src.charCodeAt(++c); s === 35 && c < u && i <= 6; )
    i++, s = e.src.charCodeAt(++c);
  return i > 6 || c < u && !$f(s) ? !1 : (o || (u = e.skipSpacesBack(u, c), a = e.skipCharsBack(u, 35, c), a > c && $f(e.src.charCodeAt(a - 1)) && (u = a), e.line = t + 1, l = e.push("heading_open", "h" + String(i), 1), l.markup = "########".slice(0, i), l.map = [t, e.line], l = e.push("inline", "", 0), l.content = e.src.slice(c, u).trim(), l.map = [t, e.line], l.children = [], l = e.push("heading_close", "h" + String(i), -1), l.markup = "########".slice(0, i)), !0);
}, Kne = function(e, t, r) {
  var o, s, i, a, l, c, u, d, f, p = t + 1, h, m = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  for (h = e.parentType, e.parentType = "paragraph"; p < r && !e.isEmpty(p); p++)
    if (!(e.sCount[p] - e.blkIndent > 3)) {
      if (e.sCount[p] >= e.blkIndent && (c = e.bMarks[p] + e.tShift[p], u = e.eMarks[p], c < u && (f = e.src.charCodeAt(c), (f === 45 || f === 61) && (c = e.skipChars(c, f), c = e.skipSpaces(c), c >= u)))) {
        d = f === 61 ? 1 : 2;
        break;
      }
      if (!(e.sCount[p] < 0)) {
        for (s = !1, i = 0, a = m.length; i < a; i++)
          if (m[i](e, p, r, !0)) {
            s = !0;
            break;
          }
        if (s)
          break;
      }
    }
  return d ? (o = e.getLines(t, p, e.blkIndent, !1).trim(), e.line = p + 1, l = e.push("heading_open", "h" + String(d), 1), l.markup = String.fromCharCode(f), l.map = [t, e.line], l = e.push("inline", "", 0), l.content = o, l.map = [t, e.line - 1], l.children = [], l = e.push("heading_close", "h" + String(d), -1), l.markup = String.fromCharCode(f), e.parentType = h, !0) : !1;
}, Jne = function(e, t) {
  var r, o, s, i, a, l, c = t + 1, u = e.md.block.ruler.getRules("paragraph"), d = e.lineMax;
  for (l = e.parentType, e.parentType = "paragraph"; c < d && !e.isEmpty(c); c++)
    if (!(e.sCount[c] - e.blkIndent > 3) && !(e.sCount[c] < 0)) {
      for (o = !1, s = 0, i = u.length; s < i; s++)
        if (u[s](e, c, d, !0)) {
          o = !0;
          break;
        }
      if (o)
        break;
    }
  return r = e.getLines(t, c, e.blkIndent, !1).trim(), e.line = c, a = e.push("paragraph_open", "p", 1), a.map = [t, e.line], a = e.push("inline", "", 0), a.content = r, a.map = [t, e.line], a.children = [], a = e.push("paragraph_close", "p", -1), e.parentType = l, !0;
}, Xm = tu, Ji = ie.isSpace;
function Vt(n, e, t, r) {
  var o, s, i, a, l, c, u, d;
  for (this.src = n, this.md = e, this.env = t, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", s = this.src, d = !1, i = a = c = u = 0, l = s.length; a < l; a++) {
    if (o = s.charCodeAt(a), !d)
      if (Ji(o)) {
        c++, o === 9 ? u += 4 - u % 4 : u++;
        continue;
      } else
        d = !0;
    (o === 10 || a === l - 1) && (o !== 10 && a++, this.bMarks.push(i), this.eMarks.push(a), this.tShift.push(c), this.sCount.push(u), this.bsCount.push(0), d = !1, c = 0, u = 0, i = a + 1);
  }
  this.bMarks.push(s.length), this.eMarks.push(s.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
Vt.prototype.push = function(n, e, t) {
  var r = new Xm(n, e, t);
  return r.block = !0, t < 0 && this.level--, r.level = this.level, t > 0 && this.level++, this.tokens.push(r), r;
};
Vt.prototype.isEmpty = function(e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
Vt.prototype.skipEmptyLines = function(e) {
  for (var t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++)
    ;
  return e;
};
Vt.prototype.skipSpaces = function(e) {
  for (var t, r = this.src.length; e < r && (t = this.src.charCodeAt(e), !!Ji(t)); e++)
    ;
  return e;
};
Vt.prototype.skipSpacesBack = function(e, t) {
  if (e <= t)
    return e;
  for (; e > t; )
    if (!Ji(this.src.charCodeAt(--e)))
      return e + 1;
  return e;
};
Vt.prototype.skipChars = function(e, t) {
  for (var r = this.src.length; e < r && this.src.charCodeAt(e) === t; e++)
    ;
  return e;
};
Vt.prototype.skipCharsBack = function(e, t, r) {
  if (e <= r)
    return e;
  for (; e > r; )
    if (t !== this.src.charCodeAt(--e))
      return e + 1;
  return e;
};
Vt.prototype.getLines = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f = e;
  if (e >= t)
    return "";
  for (u = new Array(t - e), s = 0; f < t; f++, s++) {
    for (i = 0, d = l = this.bMarks[f], f + 1 < t || o ? c = this.eMarks[f] + 1 : c = this.eMarks[f]; l < c && i < r; ) {
      if (a = this.src.charCodeAt(l), Ji(a))
        a === 9 ? i += 4 - (i + this.bsCount[f]) % 4 : i++;
      else if (l - d < this.tShift[f])
        i++;
      else
        break;
      l++;
    }
    i > r ? u[s] = new Array(i - r + 1).join(" ") + this.src.slice(l, c) : u[s] = this.src.slice(l, c);
  }
  return u.join("");
};
Vt.prototype.Token = Xm;
var Gne = Vt, Zne = eu, Ts = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", kne, ["paragraph", "reference"]],
  ["code", xne],
  ["fence", wne, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", Sne, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", Ene, ["paragraph", "reference", "blockquote", "list"]],
  ["list", Tne, ["paragraph", "reference", "blockquote"]],
  ["reference", Mne],
  ["html_block", Une, ["paragraph", "reference", "blockquote"]],
  ["heading", Wne, ["paragraph", "reference", "blockquote"]],
  ["lheading", Kne],
  ["paragraph", Jne]
];
function Gi() {
  this.ruler = new Zne();
  for (var n = 0; n < Ts.length; n++)
    this.ruler.push(Ts[n][0], Ts[n][1], { alt: (Ts[n][2] || []).slice() });
}
Gi.prototype.tokenize = function(n, e, t) {
  for (var r, o, s = this.ruler.getRules(""), i = s.length, a = e, l = !1, c = n.md.options.maxNesting; a < t && (n.line = a = n.skipEmptyLines(a), !(a >= t || n.sCount[a] < n.blkIndent)); ) {
    if (n.level >= c) {
      n.line = t;
      break;
    }
    for (o = 0; o < i && (r = s[o](n, a, t, !1), !r); o++)
      ;
    n.tight = !l, n.isEmpty(n.line - 1) && (l = !0), a = n.line, a < t && n.isEmpty(a) && (l = !0, a++, n.line = a);
  }
};
Gi.prototype.parse = function(n, e, t, r) {
  var o;
  n && (o = new this.State(n, e, t, r), this.tokenize(o, o.line, o.lineMax));
};
Gi.prototype.State = Gne;
var Yne = Gi;
function Xne(n) {
  switch (n) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
var Qne = function(e, t) {
  for (var r = e.pos; r < e.posMax && !Xne(e.src.charCodeAt(r)); )
    r++;
  return r === e.pos ? !1 : (t || (e.pending += e.src.slice(e.pos, r)), e.pos = r, !0);
}, ere = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i, tre = function(e, t) {
  var r, o, s, i, a, l, c, u;
  return !e.md.options.linkify || e.linkLevel > 0 || (r = e.pos, o = e.posMax, r + 3 > o) || e.src.charCodeAt(r) !== 58 || e.src.charCodeAt(r + 1) !== 47 || e.src.charCodeAt(r + 2) !== 47 || (s = e.pending.match(ere), !s) || (i = s[1], a = e.md.linkify.matchAtStart(e.src.slice(r - i.length)), !a) || (l = a.url, l = l.replace(/\*+$/, ""), c = e.md.normalizeLink(l), !e.md.validateLink(c)) ? !1 : (t || (e.pending = e.pending.slice(0, -i.length), u = e.push("link_open", "a", 1), u.attrs = [["href", c]], u.markup = "linkify", u.info = "auto", u = e.push("text", "", 0), u.content = e.md.normalizeLinkText(l), u = e.push("link_close", "a", -1), u.markup = "linkify", u.info = "auto"), e.pos += l.length - i.length, !0);
}, nre = ie.isSpace, rre = function(e, t) {
  var r, o, s, i = e.pos;
  if (e.src.charCodeAt(i) !== 10)
    return !1;
  if (r = e.pending.length - 1, o = e.posMax, !t)
    if (r >= 0 && e.pending.charCodeAt(r) === 32)
      if (r >= 1 && e.pending.charCodeAt(r - 1) === 32) {
        for (s = r - 1; s >= 1 && e.pending.charCodeAt(s - 1) === 32; )
          s--;
        e.pending = e.pending.slice(0, s), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else
      e.push("softbreak", "br", 0);
  for (i++; i < o && nre(e.src.charCodeAt(i)); )
    i++;
  return e.pos = i, !0;
}, ore = ie.isSpace, ru = [];
for (var Hf = 0; Hf < 256; Hf++)
  ru.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(n) {
  ru[n.charCodeAt(0)] = 1;
});
var sre = function(e, t) {
  var r, o, s, i, a, l = e.pos, c = e.posMax;
  if (e.src.charCodeAt(l) !== 92 || (l++, l >= c))
    return !1;
  if (r = e.src.charCodeAt(l), r === 10) {
    for (t || e.push("hardbreak", "br", 0), l++; l < c && (r = e.src.charCodeAt(l), !!ore(r)); )
      l++;
    return e.pos = l, !0;
  }
  return i = e.src[l], r >= 55296 && r <= 56319 && l + 1 < c && (o = e.src.charCodeAt(l + 1), o >= 56320 && o <= 57343 && (i += e.src[l + 1], l++)), s = "\\" + i, t || (a = e.push("text_special", "", 0), r < 256 && ru[r] !== 0 ? a.content = i : a.content = s, a.markup = s, a.info = "escape"), e.pos = l + 1, !0;
}, ire = function(e, t) {
  var r, o, s, i, a, l, c, u, d = e.pos, f = e.src.charCodeAt(d);
  if (f !== 96)
    return !1;
  for (r = d, d++, o = e.posMax; d < o && e.src.charCodeAt(d) === 96; )
    d++;
  if (s = e.src.slice(r, d), c = s.length, e.backticksScanned && (e.backticks[c] || 0) <= r)
    return t || (e.pending += s), e.pos += c, !0;
  for (a = l = d; (a = e.src.indexOf("`", l)) !== -1; ) {
    for (l = a + 1; l < o && e.src.charCodeAt(l) === 96; )
      l++;
    if (u = l - a, u === c)
      return t || (i = e.push("code_inline", "code", 0), i.markup = s, i.content = e.src.slice(d, a).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), e.pos = l, !0;
    e.backticks[u] = a;
  }
  return e.backticksScanned = !0, t || (e.pending += s), e.pos += c, !0;
}, Zi = {};
Zi.tokenize = function(e, t) {
  var r, o, s, i, a, l = e.pos, c = e.src.charCodeAt(l);
  if (t || c !== 126 || (o = e.scanDelims(e.pos, !0), i = o.length, a = String.fromCharCode(c), i < 2))
    return !1;
  for (i % 2 && (s = e.push("text", "", 0), s.content = a, i--), r = 0; r < i; r += 2)
    s = e.push("text", "", 0), s.content = a + a, e.delimiters.push({
      marker: c,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: e.tokens.length - 1,
      end: -1,
      open: o.can_open,
      close: o.can_close
    });
  return e.pos += o.length, !0;
};
function jf(n, e) {
  var t, r, o, s, i, a = [], l = e.length;
  for (t = 0; t < l; t++)
    o = e[t], o.marker === 126 && o.end !== -1 && (s = e[o.end], i = n.tokens[o.token], i.type = "s_open", i.tag = "s", i.nesting = 1, i.markup = "~~", i.content = "", i = n.tokens[s.token], i.type = "s_close", i.tag = "s", i.nesting = -1, i.markup = "~~", i.content = "", n.tokens[s.token - 1].type === "text" && n.tokens[s.token - 1].content === "~" && a.push(s.token - 1));
  for (; a.length; ) {
    for (t = a.pop(), r = t + 1; r < n.tokens.length && n.tokens[r].type === "s_close"; )
      r++;
    r--, t !== r && (i = n.tokens[r], n.tokens[r] = n.tokens[t], n.tokens[t] = i);
  }
}
Zi.postProcess = function(e) {
  var t, r = e.tokens_meta, o = e.tokens_meta.length;
  for (jf(e, e.delimiters), t = 0; t < o; t++)
    r[t] && r[t].delimiters && jf(e, r[t].delimiters);
};
var Yi = {};
Yi.tokenize = function(e, t) {
  var r, o, s, i = e.pos, a = e.src.charCodeAt(i);
  if (t || a !== 95 && a !== 42)
    return !1;
  for (o = e.scanDelims(e.pos, a === 42), r = 0; r < o.length; r++)
    s = e.push("text", "", 0), s.content = String.fromCharCode(a), e.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: a,
      // Total length of these series of delimiters.
      //
      length: o.length,
      // A position of the token this delimiter corresponds to.
      //
      token: e.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: o.can_open,
      close: o.can_close
    });
  return e.pos += o.length, !0;
};
function Vf(n, e) {
  var t, r, o, s, i, a, l = e.length;
  for (t = l - 1; t >= 0; t--)
    r = e[t], !(r.marker !== 95 && r.marker !== 42) && r.end !== -1 && (o = e[r.end], a = t > 0 && e[t - 1].end === r.end + 1 && // check that first two markers match and adjacent
    e[t - 1].marker === r.marker && e[t - 1].token === r.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    e[r.end + 1].token === o.token + 1, i = String.fromCharCode(r.marker), s = n.tokens[r.token], s.type = a ? "strong_open" : "em_open", s.tag = a ? "strong" : "em", s.nesting = 1, s.markup = a ? i + i : i, s.content = "", s = n.tokens[o.token], s.type = a ? "strong_close" : "em_close", s.tag = a ? "strong" : "em", s.nesting = -1, s.markup = a ? i + i : i, s.content = "", a && (n.tokens[e[t - 1].token].content = "", n.tokens[e[r.end + 1].token].content = "", t--));
}
Yi.postProcess = function(e) {
  var t, r = e.tokens_meta, o = e.tokens_meta.length;
  for (Vf(e, e.delimiters), t = 0; t < o; t++)
    r[t] && r[t].delimiters && Vf(e, r[t].delimiters);
};
var are = ie.normalizeReference, Ya = ie.isSpace, lre = function(e, t) {
  var r, o, s, i, a, l, c, u, d, f = "", p = "", h = e.pos, m = e.posMax, g = e.pos, b = !0;
  if (e.src.charCodeAt(e.pos) !== 91 || (a = e.pos + 1, i = e.md.helpers.parseLinkLabel(e, e.pos, !0), i < 0))
    return !1;
  if (l = i + 1, l < m && e.src.charCodeAt(l) === 40) {
    for (b = !1, l++; l < m && (o = e.src.charCodeAt(l), !(!Ya(o) && o !== 10)); l++)
      ;
    if (l >= m)
      return !1;
    if (g = l, c = e.md.helpers.parseLinkDestination(e.src, l, e.posMax), c.ok) {
      for (f = e.md.normalizeLink(c.str), e.md.validateLink(f) ? l = c.pos : f = "", g = l; l < m && (o = e.src.charCodeAt(l), !(!Ya(o) && o !== 10)); l++)
        ;
      if (c = e.md.helpers.parseLinkTitle(e.src, l, e.posMax), l < m && g !== l && c.ok)
        for (p = c.str, l = c.pos; l < m && (o = e.src.charCodeAt(l), !(!Ya(o) && o !== 10)); l++)
          ;
    }
    (l >= m || e.src.charCodeAt(l) !== 41) && (b = !0), l++;
  }
  if (b) {
    if (typeof e.env.references > "u")
      return !1;
    if (l < m && e.src.charCodeAt(l) === 91 ? (g = l + 1, l = e.md.helpers.parseLinkLabel(e, l), l >= 0 ? s = e.src.slice(g, l++) : l = i + 1) : l = i + 1, s || (s = e.src.slice(a, i)), u = e.env.references[are(s)], !u)
      return e.pos = h, !1;
    f = u.href, p = u.title;
  }
  return t || (e.pos = a, e.posMax = i, d = e.push("link_open", "a", 1), d.attrs = r = [["href", f]], p && r.push(["title", p]), e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, d = e.push("link_close", "a", -1)), e.pos = l, e.posMax = m, !0;
}, cre = ie.normalizeReference, Xa = ie.isSpace, ure = function(e, t) {
  var r, o, s, i, a, l, c, u, d, f, p, h, m, g = "", b = e.pos, v = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91 || (l = e.pos + 2, a = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1), a < 0))
    return !1;
  if (c = a + 1, c < v && e.src.charCodeAt(c) === 40) {
    for (c++; c < v && (o = e.src.charCodeAt(c), !(!Xa(o) && o !== 10)); c++)
      ;
    if (c >= v)
      return !1;
    for (m = c, d = e.md.helpers.parseLinkDestination(e.src, c, e.posMax), d.ok && (g = e.md.normalizeLink(d.str), e.md.validateLink(g) ? c = d.pos : g = ""), m = c; c < v && (o = e.src.charCodeAt(c), !(!Xa(o) && o !== 10)); c++)
      ;
    if (d = e.md.helpers.parseLinkTitle(e.src, c, e.posMax), c < v && m !== c && d.ok)
      for (f = d.str, c = d.pos; c < v && (o = e.src.charCodeAt(c), !(!Xa(o) && o !== 10)); c++)
        ;
    else
      f = "";
    if (c >= v || e.src.charCodeAt(c) !== 41)
      return e.pos = b, !1;
    c++;
  } else {
    if (typeof e.env.references > "u")
      return !1;
    if (c < v && e.src.charCodeAt(c) === 91 ? (m = c + 1, c = e.md.helpers.parseLinkLabel(e, c), c >= 0 ? i = e.src.slice(m, c++) : c = a + 1) : c = a + 1, i || (i = e.src.slice(l, a)), u = e.env.references[cre(i)], !u)
      return e.pos = b, !1;
    g = u.href, f = u.title;
  }
  return t || (s = e.src.slice(l, a), e.md.inline.parse(
    s,
    e.md,
    e.env,
    h = []
  ), p = e.push("image", "img", 0), p.attrs = r = [["src", g], ["alt", ""]], p.children = h, p.content = s, f && r.push(["title", f])), e.pos = c, e.posMax = v, !0;
}, dre = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, fre = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/, pre = function(e, t) {
  var r, o, s, i, a, l, c = e.pos;
  if (e.src.charCodeAt(c) !== 60)
    return !1;
  for (a = e.pos, l = e.posMax; ; ) {
    if (++c >= l || (i = e.src.charCodeAt(c), i === 60))
      return !1;
    if (i === 62)
      break;
  }
  return r = e.src.slice(a + 1, c), fre.test(r) ? (o = e.md.normalizeLink(r), e.md.validateLink(o) ? (t || (s = e.push("link_open", "a", 1), s.attrs = [["href", o]], s.markup = "autolink", s.info = "auto", s = e.push("text", "", 0), s.content = e.md.normalizeLinkText(r), s = e.push("link_close", "a", -1), s.markup = "autolink", s.info = "auto"), e.pos += r.length + 2, !0) : !1) : dre.test(r) ? (o = e.md.normalizeLink("mailto:" + r), e.md.validateLink(o) ? (t || (s = e.push("link_open", "a", 1), s.attrs = [["href", o]], s.markup = "autolink", s.info = "auto", s = e.push("text", "", 0), s.content = e.md.normalizeLinkText(r), s = e.push("link_close", "a", -1), s.markup = "autolink", s.info = "auto"), e.pos += r.length + 2, !0) : !1) : !1;
}, hre = Ki.HTML_TAG_RE;
function mre(n) {
  return /^<a[>\s]/i.test(n);
}
function gre(n) {
  return /^<\/a\s*>/i.test(n);
}
function yre(n) {
  var e = n | 32;
  return e >= 97 && e <= 122;
}
var bre = function(e, t) {
  var r, o, s, i, a = e.pos;
  return !e.md.options.html || (s = e.posMax, e.src.charCodeAt(a) !== 60 || a + 2 >= s) || (r = e.src.charCodeAt(a + 1), r !== 33 && r !== 63 && r !== 47 && !yre(r)) || (o = e.src.slice(a).match(hre), !o) ? !1 : (t || (i = e.push("html_inline", "", 0), i.content = e.src.slice(a, a + o[0].length), mre(i.content) && e.linkLevel++, gre(i.content) && e.linkLevel--), e.pos += o[0].length, !0);
}, Uf = jm, vre = ie.has, kre = ie.isValidEntityCode, Wf = ie.fromCodePoint, xre = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, wre = /^&([a-z][a-z0-9]{1,31});/i, Sre = function(e, t) {
  var r, o, s, i, a = e.pos, l = e.posMax;
  if (e.src.charCodeAt(a) !== 38 || a + 1 >= l)
    return !1;
  if (r = e.src.charCodeAt(a + 1), r === 35) {
    if (s = e.src.slice(a).match(xre), s)
      return t || (o = s[1][0].toLowerCase() === "x" ? parseInt(s[1].slice(1), 16) : parseInt(s[1], 10), i = e.push("text_special", "", 0), i.content = kre(o) ? Wf(o) : Wf(65533), i.markup = s[0], i.info = "entity"), e.pos += s[0].length, !0;
  } else if (s = e.src.slice(a).match(wre), s && vre(Uf, s[1]))
    return t || (i = e.push("text_special", "", 0), i.content = Uf[s[1]], i.markup = s[0], i.info = "entity"), e.pos += s[0].length, !0;
  return !1;
};
function Kf(n, e) {
  var t, r, o, s, i, a, l, c, u = {}, d = e.length;
  if (d) {
    var f = 0, p = -2, h = [];
    for (t = 0; t < d; t++)
      if (o = e[t], h.push(0), (e[f].marker !== o.marker || p !== o.token - 1) && (f = t), p = o.token, o.length = o.length || 0, !!o.close) {
        for (u.hasOwnProperty(o.marker) || (u[o.marker] = [-1, -1, -1, -1, -1, -1]), i = u[o.marker][(o.open ? 3 : 0) + o.length % 3], r = f - h[f] - 1, a = r; r > i; r -= h[r] + 1)
          if (s = e[r], s.marker === o.marker && s.open && s.end < 0 && (l = !1, (s.close || o.open) && (s.length + o.length) % 3 === 0 && (s.length % 3 !== 0 || o.length % 3 !== 0) && (l = !0), !l)) {
            c = r > 0 && !e[r - 1].open ? h[r - 1] + 1 : 0, h[t] = t - r + c, h[r] = c, o.open = !1, s.end = t, s.close = !1, a = -1, p = -2;
            break;
          }
        a !== -1 && (u[o.marker][(o.open ? 3 : 0) + (o.length || 0) % 3] = a);
      }
  }
}
var Cre = function(e) {
  var t, r = e.tokens_meta, o = e.tokens_meta.length;
  for (Kf(e, e.delimiters), t = 0; t < o; t++)
    r[t] && r[t].delimiters && Kf(e, r[t].delimiters);
}, Ere = function(e) {
  var t, r, o = 0, s = e.tokens, i = e.tokens.length;
  for (t = r = 0; t < i; t++)
    s[t].nesting < 0 && o--, s[t].level = o, s[t].nesting > 0 && o++, s[t].type === "text" && t + 1 < i && s[t + 1].type === "text" ? s[t + 1].content = s[t].content + s[t + 1].content : (t !== r && (s[r] = s[t]), r++);
  t !== r && (s.length = r);
}, ou = tu, Jf = ie.isWhiteSpace, Gf = ie.isPunctChar, Zf = ie.isMdAsciiPunct;
function Xo(n, e, t, r) {
  this.src = n, this.env = t, this.md = e, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
Xo.prototype.pushPending = function() {
  var n = new ou("text", "", 0);
  return n.content = this.pending, n.level = this.pendingLevel, this.tokens.push(n), this.pending = "", n;
};
Xo.prototype.push = function(n, e, t) {
  this.pending && this.pushPending();
  var r = new ou(n, e, t), o = null;
  return t < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), r.level = this.level, t > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], o = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(r), this.tokens_meta.push(o), r;
};
Xo.prototype.scanDelims = function(n, e) {
  var t = n, r, o, s, i, a, l, c, u, d, f = !0, p = !0, h = this.posMax, m = this.src.charCodeAt(n);
  for (r = n > 0 ? this.src.charCodeAt(n - 1) : 32; t < h && this.src.charCodeAt(t) === m; )
    t++;
  return s = t - n, o = t < h ? this.src.charCodeAt(t) : 32, c = Zf(r) || Gf(String.fromCharCode(r)), d = Zf(o) || Gf(String.fromCharCode(o)), l = Jf(r), u = Jf(o), u ? f = !1 : d && (l || c || (f = !1)), l ? p = !1 : c && (u || d || (p = !1)), e ? (i = f, a = p) : (i = f && (!p || c), a = p && (!f || d)), {
    can_open: i,
    can_close: a,
    length: s
  };
};
Xo.prototype.Token = ou;
var Are = Xo, Yf = eu, Qa = [
  ["text", Qne],
  ["linkify", tre],
  ["newline", rre],
  ["escape", sre],
  ["backticks", ire],
  ["strikethrough", Zi.tokenize],
  ["emphasis", Yi.tokenize],
  ["link", lre],
  ["image", ure],
  ["autolink", pre],
  ["html_inline", bre],
  ["entity", Sre]
], el = [
  ["balance_pairs", Cre],
  ["strikethrough", Zi.postProcess],
  ["emphasis", Yi.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", Ere]
];
function Qo() {
  var n;
  for (this.ruler = new Yf(), n = 0; n < Qa.length; n++)
    this.ruler.push(Qa[n][0], Qa[n][1]);
  for (this.ruler2 = new Yf(), n = 0; n < el.length; n++)
    this.ruler2.push(el[n][0], el[n][1]);
}
Qo.prototype.skipToken = function(n) {
  var e, t, r = n.pos, o = this.ruler.getRules(""), s = o.length, i = n.md.options.maxNesting, a = n.cache;
  if (typeof a[r] < "u") {
    n.pos = a[r];
    return;
  }
  if (n.level < i)
    for (t = 0; t < s && (n.level++, e = o[t](n, !0), n.level--, !e); t++)
      ;
  else
    n.pos = n.posMax;
  e || n.pos++, a[r] = n.pos;
};
Qo.prototype.tokenize = function(n) {
  for (var e, t, r = this.ruler.getRules(""), o = r.length, s = n.posMax, i = n.md.options.maxNesting; n.pos < s; ) {
    if (n.level < i)
      for (t = 0; t < o && (e = r[t](n, !1), !e); t++)
        ;
    if (e) {
      if (n.pos >= s)
        break;
      continue;
    }
    n.pending += n.src[n.pos++];
  }
  n.pending && n.pushPending();
};
Qo.prototype.parse = function(n, e, t, r) {
  var o, s, i, a = new this.State(n, e, t, r);
  for (this.tokenize(a), s = this.ruler2.getRules(""), i = s.length, o = 0; o < i; o++)
    s[o](a);
};
Qo.prototype.State = Are;
var Tre = Qo, tl, Xf;
function Ore() {
  return Xf || (Xf = 1, tl = function(n) {
    var e = {};
    n = n || {}, e.src_Any = Vm().source, e.src_Cc = Um().source, e.src_Z = Wm().source, e.src_P = Qc.source, e.src_ZPCc = [e.src_Z, e.src_P, e.src_Cc].join("|"), e.src_ZCc = [e.src_Z, e.src_Cc].join("|");
    var t = "[><｜]";
    return e.src_pseudo_letter = "(?:(?!" + t + "|" + e.src_ZPCc + ")" + e.src_Any + ")", e.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", e.src_auth = "(?:(?:(?!" + e.src_ZCc + "|[@/\\[\\]()]).)+@)?", e.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", e.src_host_terminator = "(?=$|" + t + "|" + e.src_ZPCc + ")(?!" + (n["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + e.src_ZPCc + "))", e.src_path = "(?:[/?#](?:(?!" + e.src_ZCc + "|" + t + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + e.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + e.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + e.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + e.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + e.src_ZCc + "|[']).)+\\'|\\'(?=" + e.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + e.src_ZCc + "|[.]|$)|" + (n["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + e.src_ZCc + "|$)|;(?!" + e.src_ZCc + "|$)|\\!+(?!" + e.src_ZCc + "|[!]|$)|\\?(?!" + e.src_ZCc + "|[?]|$))+|\\/)?", e.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', e.src_xn = "xn--[a-z0-9\\-]{1,59}", e.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + e.src_xn + "|" + e.src_pseudo_letter + "{1,63})", e.src_domain = "(?:" + e.src_xn + "|(?:" + e.src_pseudo_letter + ")|(?:" + e.src_pseudo_letter + "(?:-|" + e.src_pseudo_letter + "){0,61}" + e.src_pseudo_letter + "))", e.src_host = "(?:(?:(?:(?:" + e.src_domain + ")\\.)*" + e.src_domain + "))", e.tpl_host_fuzzy = "(?:" + e.src_ip4 + "|(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%)))", e.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%))", e.src_host_strict = e.src_host + e.src_host_terminator, e.tpl_host_fuzzy_strict = e.tpl_host_fuzzy + e.src_host_terminator, e.src_host_port_strict = e.src_host + e.src_port + e.src_host_terminator, e.tpl_host_port_fuzzy_strict = e.tpl_host_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_port_no_ip_fuzzy_strict = e.tpl_host_no_ip_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + e.src_ZPCc + "|>|$))", e.tpl_email_fuzzy = "(^|" + t + '|"|\\(|' + e.src_ZCc + ")(" + e.src_email_name + "@" + e.tpl_host_fuzzy_strict + ")", e.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_fuzzy_strict + e.src_path + ")", e.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_no_ip_fuzzy_strict + e.src_path + ")", e;
  }), tl;
}
function Jl(n) {
  var e = Array.prototype.slice.call(arguments, 1);
  return e.forEach(function(t) {
    t && Object.keys(t).forEach(function(r) {
      n[r] = t[r];
    });
  }), n;
}
function Xi(n) {
  return Object.prototype.toString.call(n);
}
function Mre(n) {
  return Xi(n) === "[object String]";
}
function Dre(n) {
  return Xi(n) === "[object Object]";
}
function _re(n) {
  return Xi(n) === "[object RegExp]";
}
function Qf(n) {
  return Xi(n) === "[object Function]";
}
function Nre(n) {
  return n.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var Qm = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function Rre(n) {
  return Object.keys(n || {}).reduce(function(e, t) {
    return e || Qm.hasOwnProperty(t);
  }, !1);
}
var Lre = {
  "http:": {
    validate: function(n, e, t) {
      var r = n.slice(e);
      return t.re.http || (t.re.http = new RegExp(
        "^\\/\\/" + t.re.src_auth + t.re.src_host_port_strict + t.re.src_path,
        "i"
      )), t.re.http.test(r) ? r.match(t.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(n, e, t) {
      var r = n.slice(e);
      return t.re.no_http || (t.re.no_http = new RegExp(
        "^" + t.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + t.re.src_domain + ")\\.)+" + t.re.src_domain_root + ")" + t.re.src_port + t.re.src_host_terminator + t.re.src_path,
        "i"
      )), t.re.no_http.test(r) ? e >= 3 && n[e - 3] === ":" || e >= 3 && n[e - 3] === "/" ? 0 : r.match(t.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(n, e, t) {
      var r = n.slice(e);
      return t.re.mailto || (t.re.mailto = new RegExp(
        "^" + t.re.src_email_name + "@" + t.re.src_host_strict,
        "i"
      )), t.re.mailto.test(r) ? r.match(t.re.mailto)[0].length : 0;
    }
  }
}, Pre = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", Ire = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function Bre(n) {
  n.__index__ = -1, n.__text_cache__ = "";
}
function Fre(n) {
  return function(e, t) {
    var r = e.slice(t);
    return n.test(r) ? r.match(n)[0].length : 0;
  };
}
function ep() {
  return function(n, e) {
    e.normalize(n);
  };
}
function bi(n) {
  var e = n.re = Ore()(n.__opts__), t = n.__tlds__.slice();
  n.onCompile(), n.__tlds_replaced__ || t.push(Pre), t.push(e.src_xn), e.src_tlds = t.join("|");
  function r(a) {
    return a.replace("%TLDS%", e.src_tlds);
  }
  e.email_fuzzy = RegExp(r(e.tpl_email_fuzzy), "i"), e.link_fuzzy = RegExp(r(e.tpl_link_fuzzy), "i"), e.link_no_ip_fuzzy = RegExp(r(e.tpl_link_no_ip_fuzzy), "i"), e.host_fuzzy_test = RegExp(r(e.tpl_host_fuzzy_test), "i");
  var o = [];
  n.__compiled__ = {};
  function s(a, l) {
    throw new Error('(LinkifyIt) Invalid schema "' + a + '": ' + l);
  }
  Object.keys(n.__schemas__).forEach(function(a) {
    var l = n.__schemas__[a];
    if (l !== null) {
      var c = { validate: null, link: null };
      if (n.__compiled__[a] = c, Dre(l)) {
        _re(l.validate) ? c.validate = Fre(l.validate) : Qf(l.validate) ? c.validate = l.validate : s(a, l), Qf(l.normalize) ? c.normalize = l.normalize : l.normalize ? s(a, l) : c.normalize = ep();
        return;
      }
      if (Mre(l)) {
        o.push(a);
        return;
      }
      s(a, l);
    }
  }), o.forEach(function(a) {
    n.__compiled__[n.__schemas__[a]] && (n.__compiled__[a].validate = n.__compiled__[n.__schemas__[a]].validate, n.__compiled__[a].normalize = n.__compiled__[n.__schemas__[a]].normalize);
  }), n.__compiled__[""] = { validate: null, normalize: ep() };
  var i = Object.keys(n.__compiled__).filter(function(a) {
    return a.length > 0 && n.__compiled__[a];
  }).map(Nre).join("|");
  n.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + i + ")", "i"), n.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + i + ")", "ig"), n.re.schema_at_start = RegExp("^" + n.re.schema_search.source, "i"), n.re.pretest = RegExp(
    "(" + n.re.schema_test.source + ")|(" + n.re.host_fuzzy_test.source + ")|@",
    "i"
  ), Bre(n);
}
function qre(n, e) {
  var t = n.__index__, r = n.__last_index__, o = n.__text_cache__.slice(t, r);
  this.schema = n.__schema__.toLowerCase(), this.index = t + e, this.lastIndex = r + e, this.raw = o, this.text = o, this.url = o;
}
function Gl(n, e) {
  var t = new qre(n, e);
  return n.__compiled__[t.schema].normalize(t, n), t;
}
function at(n, e) {
  if (!(this instanceof at))
    return new at(n, e);
  e || Rre(n) && (e = n, n = {}), this.__opts__ = Jl({}, Qm, e), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = Jl({}, Lre, n), this.__compiled__ = {}, this.__tlds__ = Ire, this.__tlds_replaced__ = !1, this.re = {}, bi(this);
}
at.prototype.add = function(e, t) {
  return this.__schemas__[e] = t, bi(this), this;
};
at.prototype.set = function(e) {
  return this.__opts__ = Jl(this.__opts__, e), this;
};
at.prototype.test = function(e) {
  if (this.__text_cache__ = e, this.__index__ = -1, !e.length)
    return !1;
  var t, r, o, s, i, a, l, c, u;
  if (this.re.schema_test.test(e)) {
    for (l = this.re.schema_search, l.lastIndex = 0; (t = l.exec(e)) !== null; )
      if (s = this.testSchemaAt(e, t[2], l.lastIndex), s) {
        this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + s;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c = e.search(this.re.host_fuzzy_test), c >= 0 && (this.__index__ < 0 || c < this.__index__) && (r = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (i = r.index + r[1].length, (this.__index__ < 0 || i < this.__index__) && (this.__schema__ = "", this.__index__ = i, this.__last_index__ = r.index + r[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (u = e.indexOf("@"), u >= 0 && (o = e.match(this.re.email_fuzzy)) !== null && (i = o.index + o[1].length, a = o.index + o[0].length, (this.__index__ < 0 || i < this.__index__ || i === this.__index__ && a > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = i, this.__last_index__ = a))), this.__index__ >= 0;
};
at.prototype.pretest = function(e) {
  return this.re.pretest.test(e);
};
at.prototype.testSchemaAt = function(e, t, r) {
  return this.__compiled__[t.toLowerCase()] ? this.__compiled__[t.toLowerCase()].validate(e, r, this) : 0;
};
at.prototype.match = function(e) {
  var t = 0, r = [];
  this.__index__ >= 0 && this.__text_cache__ === e && (r.push(Gl(this, t)), t = this.__last_index__);
  for (var o = t ? e.slice(t) : e; this.test(o); )
    r.push(Gl(this, t)), o = o.slice(this.__last_index__), t += this.__last_index__;
  return r.length ? r : null;
};
at.prototype.matchAtStart = function(e) {
  if (this.__text_cache__ = e, this.__index__ = -1, !e.length)
    return null;
  var t = this.re.schema_at_start.exec(e);
  if (!t)
    return null;
  var r = this.testSchemaAt(e, t[2], t[0].length);
  return r ? (this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + r, Gl(this, 0)) : null;
};
at.prototype.tlds = function(e, t) {
  return e = Array.isArray(e) ? e : [e], t ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(r, o, s) {
    return r !== s[o - 1];
  }).reverse(), bi(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, bi(this), this);
};
at.prototype.normalize = function(e) {
  e.schema || (e.url = "http://" + e.url), e.schema === "mailto:" && !/^mailto:/i.test(e.url) && (e.url = "mailto:" + e.url);
};
at.prototype.onCompile = function() {
};
var zre = at;
const Fr = 2147483647, Bt = 36, su = 1, jo = 26, $re = 38, Hre = 700, eg = 72, tg = 128, ng = "-", jre = /^xn--/, Vre = /[^\0-\x7F]/, Ure = /[\x2E\u3002\uFF0E\uFF61]/g, Wre = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, nl = Bt - su, Ft = Math.floor, rl = String.fromCharCode;
function pn(n) {
  throw new RangeError(Wre[n]);
}
function Kre(n, e) {
  const t = [];
  let r = n.length;
  for (; r--; )
    t[r] = e(n[r]);
  return t;
}
function rg(n, e) {
  const t = n.split("@");
  let r = "";
  t.length > 1 && (r = t[0] + "@", n = t[1]), n = n.replace(Ure, ".");
  const o = n.split("."), s = Kre(o, e).join(".");
  return r + s;
}
function iu(n) {
  const e = [];
  let t = 0;
  const r = n.length;
  for (; t < r; ) {
    const o = n.charCodeAt(t++);
    if (o >= 55296 && o <= 56319 && t < r) {
      const s = n.charCodeAt(t++);
      (s & 64512) == 56320 ? e.push(((o & 1023) << 10) + (s & 1023) + 65536) : (e.push(o), t--);
    } else
      e.push(o);
  }
  return e;
}
const og = (n) => String.fromCodePoint(...n), Jre = function(n) {
  return n >= 48 && n < 58 ? 26 + (n - 48) : n >= 65 && n < 91 ? n - 65 : n >= 97 && n < 123 ? n - 97 : Bt;
}, tp = function(n, e) {
  return n + 22 + 75 * (n < 26) - ((e != 0) << 5);
}, sg = function(n, e, t) {
  let r = 0;
  for (n = t ? Ft(n / Hre) : n >> 1, n += Ft(n / e); n > nl * jo >> 1; r += Bt)
    n = Ft(n / nl);
  return Ft(r + (nl + 1) * n / (n + $re));
}, au = function(n) {
  const e = [], t = n.length;
  let r = 0, o = tg, s = eg, i = n.lastIndexOf(ng);
  i < 0 && (i = 0);
  for (let a = 0; a < i; ++a)
    n.charCodeAt(a) >= 128 && pn("not-basic"), e.push(n.charCodeAt(a));
  for (let a = i > 0 ? i + 1 : 0; a < t; ) {
    const l = r;
    for (let u = 1, d = Bt; ; d += Bt) {
      a >= t && pn("invalid-input");
      const f = Jre(n.charCodeAt(a++));
      f >= Bt && pn("invalid-input"), f > Ft((Fr - r) / u) && pn("overflow"), r += f * u;
      const p = d <= s ? su : d >= s + jo ? jo : d - s;
      if (f < p)
        break;
      const h = Bt - p;
      u > Ft(Fr / h) && pn("overflow"), u *= h;
    }
    const c = e.length + 1;
    s = sg(r - l, c, l == 0), Ft(r / c) > Fr - o && pn("overflow"), o += Ft(r / c), r %= c, e.splice(r++, 0, o);
  }
  return String.fromCodePoint(...e);
}, lu = function(n) {
  const e = [];
  n = iu(n);
  const t = n.length;
  let r = tg, o = 0, s = eg;
  for (const l of n)
    l < 128 && e.push(rl(l));
  const i = e.length;
  let a = i;
  for (i && e.push(ng); a < t; ) {
    let l = Fr;
    for (const u of n)
      u >= r && u < l && (l = u);
    const c = a + 1;
    l - r > Ft((Fr - o) / c) && pn("overflow"), o += (l - r) * c, r = l;
    for (const u of n)
      if (u < r && ++o > Fr && pn("overflow"), u === r) {
        let d = o;
        for (let f = Bt; ; f += Bt) {
          const p = f <= s ? su : f >= s + jo ? jo : f - s;
          if (d < p)
            break;
          const h = d - p, m = Bt - p;
          e.push(
            rl(tp(p + h % m, 0))
          ), d = Ft(h / m);
        }
        e.push(rl(tp(d, 0))), s = sg(o, c, a === i), o = 0, ++a;
      }
    ++o, ++r;
  }
  return e.join("");
}, ig = function(n) {
  return rg(n, function(e) {
    return jre.test(e) ? au(e.slice(4).toLowerCase()) : e;
  });
}, ag = function(n) {
  return rg(n, function(e) {
    return Vre.test(e) ? "xn--" + lu(e) : e;
  });
}, Gre = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: iu,
    encode: og
  },
  decode: au,
  encode: lu,
  toASCII: ag,
  toUnicode: ig
}, Zre = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: au,
  default: Gre,
  encode: lu,
  toASCII: ag,
  toUnicode: ig,
  ucs2decode: iu,
  ucs2encode: og
}, Symbol.toStringTag, { value: "Module" })), Yre = /* @__PURE__ */ aC(Zre);
var Xre = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 100
    // Internal protection, recursion limit
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, Qre = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
}, eoe = {
  options: {
    html: !0,
    // Enable HTML tags in source
    xhtmlOut: !0,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
}, Mo = ie, toe = Wi, noe = Gte, roe = vne, ooe = Yne, soe = Tre, ioe = zre, Hn = Qr, lg = Yre, aoe = {
  default: Xre,
  zero: Qre,
  commonmark: eoe
}, loe = /^(vbscript|javascript|file|data):/, coe = /^data:image\/(gif|png|jpeg|webp);/;
function uoe(n) {
  var e = n.trim().toLowerCase();
  return loe.test(e) ? !!coe.test(e) : !0;
}
var cg = ["http:", "https:", "mailto:"];
function doe(n) {
  var e = Hn.parse(n, !0);
  if (e.hostname && (!e.protocol || cg.indexOf(e.protocol) >= 0))
    try {
      e.hostname = lg.toASCII(e.hostname);
    } catch {
    }
  return Hn.encode(Hn.format(e));
}
function foe(n) {
  var e = Hn.parse(n, !0);
  if (e.hostname && (!e.protocol || cg.indexOf(e.protocol) >= 0))
    try {
      e.hostname = lg.toUnicode(e.hostname);
    } catch {
    }
  return Hn.decode(Hn.format(e), Hn.decode.defaultChars + "%");
}
function yt(n, e) {
  if (!(this instanceof yt))
    return new yt(n, e);
  e || Mo.isString(n) || (e = n || {}, n = "default"), this.inline = new soe(), this.block = new ooe(), this.core = new roe(), this.renderer = new noe(), this.linkify = new ioe(), this.validateLink = uoe, this.normalizeLink = doe, this.normalizeLinkText = foe, this.utils = Mo, this.helpers = Mo.assign({}, toe), this.options = {}, this.configure(n), e && this.set(e);
}
yt.prototype.set = function(n) {
  return Mo.assign(this.options, n), this;
};
yt.prototype.configure = function(n) {
  var e = this, t;
  if (Mo.isString(n) && (t = n, n = aoe[t], !n))
    throw new Error('Wrong `markdown-it` preset "' + t + '", check name');
  if (!n)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return n.options && e.set(n.options), n.components && Object.keys(n.components).forEach(function(r) {
    n.components[r].rules && e[r].ruler.enableOnly(n.components[r].rules), n.components[r].rules2 && e[r].ruler2.enableOnly(n.components[r].rules2);
  }), this;
};
yt.prototype.enable = function(n, e) {
  var t = [];
  Array.isArray(n) || (n = [n]), ["core", "block", "inline"].forEach(function(o) {
    t = t.concat(this[o].ruler.enable(n, !0));
  }, this), t = t.concat(this.inline.ruler2.enable(n, !0));
  var r = n.filter(function(o) {
    return t.indexOf(o) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
  return this;
};
yt.prototype.disable = function(n, e) {
  var t = [];
  Array.isArray(n) || (n = [n]), ["core", "block", "inline"].forEach(function(o) {
    t = t.concat(this[o].ruler.disable(n, !0));
  }, this), t = t.concat(this.inline.ruler2.disable(n, !0));
  var r = n.filter(function(o) {
    return t.indexOf(o) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
  return this;
};
yt.prototype.use = function(n) {
  var e = [this].concat(Array.prototype.slice.call(arguments, 1));
  return n.apply(n, e), this;
};
yt.prototype.parse = function(n, e) {
  if (typeof n != "string")
    throw new Error("Input data should be a String");
  var t = new this.core.State(n, this, e);
  return this.core.process(t), t.tokens;
};
yt.prototype.render = function(n, e) {
  return e = e || {}, this.renderer.render(this.parse(n, e), this.options, e);
};
yt.prototype.parseInline = function(n, e) {
  var t = new this.core.State(n, this, e);
  return t.inlineMode = !0, this.core.process(t), t.tokens;
};
yt.prototype.renderInline = function(n, e) {
  return e = e || {}, this.renderer.render(this.parseInline(n, e), this.options, e);
};
var poe = yt, hoe = poe;
const cu = /* @__PURE__ */ Hm(hoe), moe = new Wp({
  nodes: {
    doc: {
      content: "block+"
    },
    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return ["p", 0];
      }
    },
    blockquote: {
      content: "block+",
      group: "block",
      parseDOM: [{ tag: "blockquote" }],
      toDOM() {
        return ["blockquote", 0];
      }
    },
    horizontal_rule: {
      group: "block",
      parseDOM: [{ tag: "hr" }],
      toDOM() {
        return ["div", ["hr"]];
      }
    },
    heading: {
      attrs: { level: { default: 1 } },
      content: "(text | image)*",
      group: "block",
      defining: !0,
      parseDOM: [
        { tag: "h1", attrs: { level: 1 } },
        { tag: "h2", attrs: { level: 2 } },
        { tag: "h3", attrs: { level: 3 } },
        { tag: "h4", attrs: { level: 4 } },
        { tag: "h5", attrs: { level: 5 } },
        { tag: "h6", attrs: { level: 6 } }
      ],
      toDOM(n) {
        return ["h" + n.attrs.level, 0];
      }
    },
    code_block: {
      content: "text*",
      group: "block",
      code: !0,
      defining: !0,
      marks: "",
      attrs: { params: { default: "" } },
      parseDOM: [{ tag: "pre", preserveWhitespace: "full", getAttrs: (n) => ({ params: n.getAttribute("data-params") || "" }) }],
      toDOM(n) {
        return ["pre", n.attrs.params ? { "data-params": n.attrs.params } : {}, ["code", 0]];
      }
    },
    ordered_list: {
      content: "list_item+",
      group: "block",
      attrs: { order: { default: 1 }, tight: { default: !1 } },
      parseDOM: [{ tag: "ol", getAttrs(n) {
        return {
          order: n.hasAttribute("start") ? +n.getAttribute("start") : 1,
          tight: n.hasAttribute("data-tight")
        };
      } }],
      toDOM(n) {
        return ["ol", {
          start: n.attrs.order == 1 ? null : n.attrs.order,
          "data-tight": n.attrs.tight ? "true" : null
        }, 0];
      }
    },
    bullet_list: {
      content: "list_item+",
      group: "block",
      attrs: { tight: { default: !1 } },
      parseDOM: [{ tag: "ul", getAttrs: (n) => ({ tight: n.hasAttribute("data-tight") }) }],
      toDOM(n) {
        return ["ul", { "data-tight": n.attrs.tight ? "true" : null }, 0];
      }
    },
    list_item: {
      content: "block+",
      defining: !0,
      parseDOM: [{ tag: "li" }],
      toDOM() {
        return ["li", 0];
      }
    },
    text: {
      group: "inline"
    },
    image: {
      inline: !0,
      attrs: {
        src: {},
        alt: { default: null },
        title: { default: null }
      },
      group: "inline",
      draggable: !0,
      parseDOM: [{ tag: "img[src]", getAttrs(n) {
        return {
          src: n.getAttribute("src"),
          title: n.getAttribute("title"),
          alt: n.getAttribute("alt")
        };
      } }],
      toDOM(n) {
        return ["img", n.attrs];
      }
    },
    hard_break: {
      inline: !0,
      group: "inline",
      selectable: !1,
      parseDOM: [{ tag: "br" }],
      toDOM() {
        return ["br"];
      }
    }
  },
  marks: {
    em: {
      parseDOM: [
        { tag: "i" },
        { tag: "em" },
        { style: "font-style=italic" },
        { style: "font-style=normal", clearMark: (n) => n.type.name == "em" }
      ],
      toDOM() {
        return ["em"];
      }
    },
    strong: {
      parseDOM: [
        { tag: "strong" },
        { tag: "b", getAttrs: (n) => n.style.fontWeight != "normal" && null },
        { style: "font-weight=400", clearMark: (n) => n.type.name == "strong" },
        { style: "font-weight", getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null }
      ],
      toDOM() {
        return ["strong"];
      }
    },
    link: {
      attrs: {
        href: {},
        title: { default: null }
      },
      inclusive: !1,
      parseDOM: [{ tag: "a[href]", getAttrs(n) {
        return { href: n.getAttribute("href"), title: n.getAttribute("title") };
      } }],
      toDOM(n) {
        return ["a", n.attrs];
      }
    },
    code: {
      parseDOM: [{ tag: "code" }],
      toDOM() {
        return ["code"];
      }
    }
  }
});
function goe(n, e) {
  if (n.isText && e.isText && oe.sameSet(n.marks, e.marks))
    return n.withText(n.text + e.text);
}
class yoe {
  constructor(e, t) {
    this.schema = e, this.tokenHandlers = t, this.stack = [{ type: e.topNodeType, attrs: null, content: [], marks: oe.none }];
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  push(e) {
    this.stack.length && this.top().content.push(e);
  }
  // Adds the given text to the current position in the document,
  // using the current marks as styling.
  addText(e) {
    if (!e)
      return;
    let t = this.top(), r = t.content, o = r[r.length - 1], s = this.schema.text(e, t.marks), i;
    o && (i = goe(o, s)) ? r[r.length - 1] = i : r.push(s);
  }
  // Adds the given mark to the set of active marks.
  openMark(e) {
    let t = this.top();
    t.marks = e.addToSet(t.marks);
  }
  // Removes the given mark from the set of active marks.
  closeMark(e) {
    let t = this.top();
    t.marks = e.removeFromSet(t.marks);
  }
  parseTokens(e) {
    for (let t = 0; t < e.length; t++) {
      let r = e[t], o = this.tokenHandlers[r.type];
      if (!o)
        throw new Error("Token type `" + r.type + "` not supported by Markdown parser");
      o(this, r, e, t);
    }
  }
  // Add a node at the current position.
  addNode(e, t, r) {
    let o = this.top(), s = e.createAndFill(t, r, o ? o.marks : []);
    return s ? (this.push(s), s) : null;
  }
  // Wrap subsequent content in a node of the given type.
  openNode(e, t) {
    this.stack.push({ type: e, attrs: t, content: [], marks: oe.none });
  }
  // Close and return the node that is currently on top of the stack.
  closeNode() {
    let e = this.stack.pop();
    return this.addNode(e.type, e.attrs, e.content);
  }
}
function po(n, e, t, r) {
  return n.getAttrs ? n.getAttrs(e, t, r) : n.attrs instanceof Function ? n.attrs(e) : n.attrs;
}
function ol(n, e) {
  return n.noCloseToken || e == "code_inline" || e == "code_block" || e == "fence";
}
function np(n) {
  return n[n.length - 1] == `
` ? n.slice(0, n.length - 1) : n;
}
function sl() {
}
function boe(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in e) {
    let o = e[r];
    if (o.block) {
      let s = n.nodeType(o.block);
      ol(o, r) ? t[r] = (i, a, l, c) => {
        i.openNode(s, po(o, a, l, c)), i.addText(np(a.content)), i.closeNode();
      } : (t[r + "_open"] = (i, a, l, c) => i.openNode(s, po(o, a, l, c)), t[r + "_close"] = (i) => i.closeNode());
    } else if (o.node) {
      let s = n.nodeType(o.node);
      t[r] = (i, a, l, c) => i.addNode(s, po(o, a, l, c));
    } else if (o.mark) {
      let s = n.marks[o.mark];
      ol(o, r) ? t[r] = (i, a, l, c) => {
        i.openMark(s.create(po(o, a, l, c))), i.addText(np(a.content)), i.closeMark(s);
      } : (t[r + "_open"] = (i, a, l, c) => i.openMark(s.create(po(o, a, l, c))), t[r + "_close"] = (i) => i.closeMark(s));
    } else if (o.ignore)
      ol(o, r) ? t[r] = sl : (t[r + "_open"] = sl, t[r + "_close"] = sl);
    else
      throw new RangeError("Unrecognized parsing spec " + JSON.stringify(o));
  }
  return t.text = (r, o) => r.addText(o.content), t.inline = (r, o) => r.parseTokens(o.children), t.softbreak = t.softbreak || ((r) => r.addText(" ")), t;
}
let voe = class {
  /**
  Create a parser with the given configuration. You can configure
  the markdown-it parser to parse the dialect you want, and provide
  a description of the ProseMirror entities those tokens map to in
  the `tokens` object, which maps token names to descriptions of
  what to do with them. Such a description is an object, and may
  have the following properties:
  */
  constructor(e, t, r) {
    this.schema = e, this.tokenizer = t, this.tokens = r, this.tokenHandlers = boe(e, r);
  }
  /**
  Parse a string as [CommonMark](http://commonmark.org/) markup,
  and create a ProseMirror document as prescribed by this parser's
  rules.
  
  The second argument, when given, is passed through to the
  [Markdown
  parser](https://markdown-it.github.io/markdown-it/#MarkdownIt.parse).
  */
  parse(e, t = {}) {
    let r = new yoe(this.schema, this.tokenHandlers), o;
    r.parseTokens(this.tokenizer.parse(e, t));
    do
      o = r.closeNode();
    while (r.stack.length);
    return o || this.schema.topNodeType.createAndFill();
  }
};
function rp(n, e) {
  for (; ++e < n.length; )
    if (n[e].type != "list_item_open")
      return n[e].hidden;
  return !1;
}
new voe(moe, cu("commonmark", { html: !1 }), {
  blockquote: { block: "blockquote" },
  paragraph: { block: "paragraph" },
  list_item: { block: "list_item" },
  bullet_list: { block: "bullet_list", getAttrs: (n, e, t) => ({ tight: rp(e, t) }) },
  ordered_list: { block: "ordered_list", getAttrs: (n, e, t) => ({
    order: +n.attrGet("start") || 1,
    tight: rp(e, t)
  }) },
  heading: { block: "heading", getAttrs: (n) => ({ level: +n.tag.slice(1) }) },
  code_block: { block: "code_block", noCloseToken: !0 },
  fence: { block: "code_block", getAttrs: (n) => ({ params: n.info || "" }), noCloseToken: !0 },
  hr: { node: "horizontal_rule" },
  image: { node: "image", getAttrs: (n) => ({
    src: n.attrGet("src"),
    title: n.attrGet("title") || null,
    alt: n.children[0] && n.children[0].content || null
  }) },
  hardbreak: { node: "hard_break" },
  em: { mark: "em" },
  strong: { mark: "strong" },
  link: { mark: "link", getAttrs: (n) => ({
    href: n.attrGet("href"),
    title: n.attrGet("title") || null
  }) },
  code_inline: { mark: "code", noCloseToken: !0 }
});
let koe = class {
  /**
  Construct a serializer with the given configuration. The `nodes`
  object should map node names in a given schema to function that
  take a serializer state and such a node, and serialize the node.
  */
  constructor(e, t, r = {}) {
    this.nodes = e, this.marks = t, this.options = r;
  }
  /**
  Serialize the content of the given node to
  [CommonMark](http://commonmark.org/).
  */
  serialize(e, t = {}) {
    t = Object.assign({}, this.options, t);
    let r = new ug(this.nodes, this.marks, t);
    return r.renderContent(e), r.out;
  }
};
const bt = new koe({
  blockquote(n, e) {
    n.wrapBlock("> ", null, e, () => n.renderContent(e));
  },
  code_block(n, e) {
    const t = e.textContent.match(/`{3,}/gm), r = t ? t.sort().slice(-1)[0] + "`" : "```";
    n.write(r + (e.attrs.params || "") + `
`), n.text(e.textContent, !1), n.write(`
`), n.write(r), n.closeBlock(e);
  },
  heading(n, e) {
    n.write(n.repeat("#", e.attrs.level) + " "), n.renderInline(e), n.closeBlock(e);
  },
  horizontal_rule(n, e) {
    n.write(e.attrs.markup || "---"), n.closeBlock(e);
  },
  bullet_list(n, e) {
    n.renderList(e, "  ", () => (e.attrs.bullet || "*") + " ");
  },
  ordered_list(n, e) {
    let t = e.attrs.order || 1, r = String(t + e.childCount - 1).length, o = n.repeat(" ", r + 2);
    n.renderList(e, o, (s) => {
      let i = String(t + s);
      return n.repeat(" ", r - i.length) + i + ". ";
    });
  },
  list_item(n, e) {
    n.renderContent(e);
  },
  paragraph(n, e) {
    n.renderInline(e), n.closeBlock(e);
  },
  image(n, e) {
    n.write("![" + n.esc(e.attrs.alt || "") + "](" + e.attrs.src.replace(/[\(\)]/g, "\\$&") + (e.attrs.title ? ' "' + e.attrs.title.replace(/"/g, '\\"') + '"' : "") + ")");
  },
  hard_break(n, e, t, r) {
    for (let o = r + 1; o < t.childCount; o++)
      if (t.child(o).type != e.type) {
        n.write(`\\
`);
        return;
      }
  },
  text(n, e) {
    n.text(e.text, !n.inAutolink);
  }
}, {
  em: { open: "*", close: "*", mixable: !0, expelEnclosingWhitespace: !0 },
  strong: { open: "**", close: "**", mixable: !0, expelEnclosingWhitespace: !0 },
  link: {
    open(n, e, t, r) {
      return n.inAutolink = xoe(e, t, r), n.inAutolink ? "<" : "[";
    },
    close(n, e, t, r) {
      let { inAutolink: o } = n;
      return n.inAutolink = void 0, o ? ">" : "](" + e.attrs.href.replace(/[\(\)"]/g, "\\$&") + (e.attrs.title ? ` "${e.attrs.title.replace(/"/g, '\\"')}"` : "") + ")";
    },
    mixable: !0
  },
  code: {
    open(n, e, t, r) {
      return op(t.child(r), -1);
    },
    close(n, e, t, r) {
      return op(t.child(r - 1), 1);
    },
    escape: !1
  }
});
function op(n, e) {
  let t = /`+/g, r, o = 0;
  if (n.isText)
    for (; r = t.exec(n.text); )
      o = Math.max(o, r[0].length);
  let s = o > 0 && e > 0 ? " `" : "`";
  for (let i = 0; i < o; i++)
    s += "`";
  return o > 0 && e < 0 && (s += " "), s;
}
function xoe(n, e, t) {
  if (n.attrs.title || !/^\w+:/.test(n.attrs.href))
    return !1;
  let r = e.child(t);
  return !r.isText || r.text != n.attrs.href || r.marks[r.marks.length - 1] != n ? !1 : t == e.childCount - 1 || !n.isInSet(e.child(t + 1).marks);
}
let ug = class {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.nodes = e, this.marks = t, this.options = r, this.delim = "", this.out = "", this.closed = null, this.inAutolink = void 0, this.atBlockStart = !1, this.inTightList = !1, typeof this.options.tightLists > "u" && (this.options.tightLists = !1), typeof this.options.hardBreakNodeName > "u" && (this.options.hardBreakNodeName = "hard_break");
  }
  /**
  @internal
  */
  flushClose(e = 2) {
    if (this.closed) {
      if (this.atBlank() || (this.out += `
`), e > 1) {
        let t = this.delim, r = /\s+$/.exec(t);
        r && (t = t.slice(0, t.length - r[0].length));
        for (let o = 1; o < e; o++)
          this.out += t + `
`;
      }
      this.closed = null;
    }
  }
  /**
  Render a block, prefixing each line with `delim`, and the first
  line in `firstDelim`. `node` should be the node that is closed at
  the end of the block, and `f` is a function that renders the
  content of the block.
  */
  wrapBlock(e, t, r, o) {
    let s = this.delim;
    this.write(t ?? e), this.delim += e, o(), this.delim = s, this.closeBlock(r);
  }
  /**
  @internal
  */
  atBlank() {
    return /(^|\n)$/.test(this.out);
  }
  /**
  Ensure the current content ends with a newline.
  */
  ensureNewLine() {
    this.atBlank() || (this.out += `
`);
  }
  /**
  Prepare the state for writing output (closing closed paragraphs,
  adding delimiters, and so on), and then optionally add content
  (unescaped) to the output.
  */
  write(e) {
    this.flushClose(), this.delim && this.atBlank() && (this.out += this.delim), e && (this.out += e);
  }
  /**
  Close the block for the given node.
  */
  closeBlock(e) {
    this.closed = e;
  }
  /**
  Add the given text to the document. When escape is not `false`,
  it will be escaped.
  */
  text(e, t = !0) {
    let r = e.split(`
`);
    for (let o = 0; o < r.length; o++)
      this.write(), !t && r[o][0] == "[" && /(^|[^\\])\!$/.test(this.out) && (this.out = this.out.slice(0, this.out.length - 1) + "\\!"), this.out += t ? this.esc(r[o], this.atBlockStart) : r[o], o != r.length - 1 && (this.out += `
`);
  }
  /**
  Render the given node as a block.
  */
  render(e, t, r) {
    if (typeof t == "number")
      throw new Error("!");
    if (!this.nodes[e.type.name])
      throw new Error("Token type `" + e.type.name + "` not supported by Markdown renderer");
    this.nodes[e.type.name](this, e, t, r);
  }
  /**
  Render the contents of `parent` as block nodes.
  */
  renderContent(e) {
    e.forEach((t, r, o) => this.render(t, e, o));
  }
  /**
  Render the contents of `parent` as inline content.
  */
  renderInline(e) {
    this.atBlockStart = !0;
    let t = [], r = "", o = (s, i, a) => {
      let l = s ? s.marks : [];
      s && s.type.name === this.options.hardBreakNodeName && (l = l.filter((h) => {
        if (a + 1 == e.childCount)
          return !1;
        let m = e.child(a + 1);
        return h.isInSet(m.marks) && (!m.isText || /\S/.test(m.text));
      }));
      let c = r;
      if (r = "", s && s.isText && l.some((h) => {
        let m = this.marks[h.type.name];
        return m && m.expelEnclosingWhitespace && !h.isInSet(t);
      })) {
        let [h, m, g] = /^(\s*)(.*)$/m.exec(s.text);
        m && (c += m, s = g ? s.withText(g) : null, s || (l = t));
      }
      if (s && s.isText && l.some((h) => {
        let m = this.marks[h.type.name];
        return m && m.expelEnclosingWhitespace && (a == e.childCount - 1 || !h.isInSet(e.child(a + 1).marks));
      })) {
        let [h, m, g] = /^(.*?)(\s*)$/m.exec(s.text);
        g && (r = g, s = m ? s.withText(m) : null, s || (l = t));
      }
      let u = l.length ? l[l.length - 1] : null, d = u && this.marks[u.type.name].escape === !1, f = l.length - (d ? 1 : 0);
      e:
        for (let h = 0; h < f; h++) {
          let m = l[h];
          if (!this.marks[m.type.name].mixable)
            break;
          for (let g = 0; g < t.length; g++) {
            let b = t[g];
            if (!this.marks[b.type.name].mixable)
              break;
            if (m.eq(b)) {
              h > g ? l = l.slice(0, g).concat(m).concat(l.slice(g, h)).concat(l.slice(h + 1, f)) : g > h && (l = l.slice(0, h).concat(l.slice(h + 1, g)).concat(m).concat(l.slice(g, f)));
              continue e;
            }
          }
        }
      let p = 0;
      for (; p < Math.min(t.length, f) && l[p].eq(t[p]); )
        ++p;
      for (; p < t.length; )
        this.text(this.markString(t.pop(), !1, e, a), !1);
      if (c && this.text(c), s) {
        for (; t.length < f; ) {
          let h = l[t.length];
          t.push(h), this.text(this.markString(h, !0, e, a), !1), this.atBlockStart = !1;
        }
        d && s.isText ? this.text(this.markString(u, !0, e, a) + s.text + this.markString(u, !1, e, a + 1), !1) : this.render(s, e, a), this.atBlockStart = !1;
      }
      s != null && s.isText && s.nodeSize > 0 && (this.atBlockStart = !1);
    };
    e.forEach(o), o(null, 0, e.childCount), this.atBlockStart = !1;
  }
  /**
  Render a node's content as a list. `delim` should be the extra
  indentation added to all lines except the first in an item,
  `firstDelim` is a function going from an item index to a
  delimiter for the first line of the item.
  */
  renderList(e, t, r) {
    this.closed && this.closed.type == e.type ? this.flushClose(3) : this.inTightList && this.flushClose(1);
    let o = typeof e.attrs.tight < "u" ? e.attrs.tight : this.options.tightLists, s = this.inTightList;
    this.inTightList = o, e.forEach((i, a, l) => {
      l && o && this.flushClose(1), this.wrapBlock(t, r(l), e, () => this.render(i, e, l));
    }), this.inTightList = s;
  }
  /**
  Escape the given string so that it can safely appear in Markdown
  content. If `startOfLine` is true, also escape characters that
  have special meaning only at the start of the line.
  */
  esc(e, t = !1) {
    return e = e.replace(/[`*\\~\[\]_]/g, (r, o) => r == "_" && o > 0 && o + 1 < e.length && e[o - 1].match(/\w/) && e[o + 1].match(/\w/) ? r : "\\" + r), t && (e = e.replace(/^[\-*+>]/, "\\$&").replace(/^(\s*)(#{1,6})(\s|$)/, "$1\\$2$3").replace(/^(\s*\d+)\.\s/, "$1\\. ")), this.options.escapeExtraCharacters && (e = e.replace(this.options.escapeExtraCharacters, "\\$&")), e;
  }
  /**
  @internal
  */
  quote(e) {
    let t = e.indexOf('"') == -1 ? '""' : e.indexOf("'") == -1 ? "''" : "()";
    return t[0] + e + t[1];
  }
  /**
  Repeat the given string `n` times.
  */
  repeat(e, t) {
    let r = "";
    for (let o = 0; o < t; o++)
      r += e;
    return r;
  }
  /**
  Get the markdown string for a given opening or closing mark.
  */
  markString(e, t, r, o) {
    let s = this.marks[e.type.name], i = t ? s.open : s.close;
    return typeof i == "string" ? i : i(this, e, r, o);
  }
  /**
  Get leading and trailing whitespace from a string. Values of
  leading or trailing property of the return object will be undefined
  if there is no match.
  */
  getEnclosingWhitespace(e) {
    return {
      leading: (e.match(/^(\s+)/) || [void 0])[0],
      trailing: (e.match(/(\s+)$/) || [void 0])[0]
    };
  }
};
var Zl = !0, dg = !1, fg = !1, woe = function(n, e) {
  e && (Zl = !e.enabled, dg = !!e.label, fg = !!e.labelAfter), n.core.ruler.after("inline", "github-task-lists", function(t) {
    for (var r = t.tokens, o = 2; o < r.length; o++)
      Coe(r, o) && (Eoe(r[o], t.Token), sp(r[o - 2], "class", "task-list-item" + (Zl ? "" : " enabled")), sp(r[Soe(r, o - 2)], "class", "contains-task-list"));
  });
};
function sp(n, e, t) {
  var r = n.attrIndex(e), o = [e, t];
  r < 0 ? n.attrPush(o) : n.attrs[r] = o;
}
function Soe(n, e) {
  for (var t = n[e].level - 1, r = e - 1; r >= 0; r--)
    if (n[r].level === t)
      return r;
  return -1;
}
function Coe(n, e) {
  return Doe(n[e]) && _oe(n[e - 1]) && Noe(n[e - 2]) && Roe(n[e]);
}
function Eoe(n, e) {
  if (n.children.unshift(Aoe(n, e)), n.children[1].content = n.children[1].content.slice(3), n.content = n.content.slice(3), dg)
    if (fg) {
      n.children.pop();
      var t = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
      n.children[0].content = n.children[0].content.slice(0, -1) + ' id="' + t + '">', n.children.push(Moe(n.content, t, e));
    } else
      n.children.unshift(Toe(e)), n.children.push(Ooe(e));
}
function Aoe(n, e) {
  var t = new e("html_inline", "", 0), r = Zl ? ' disabled="" ' : "";
  return n.content.indexOf("[ ] ") === 0 ? t.content = '<input class="task-list-item-checkbox"' + r + 'type="checkbox">' : (n.content.indexOf("[x] ") === 0 || n.content.indexOf("[X] ") === 0) && (t.content = '<input class="task-list-item-checkbox" checked=""' + r + 'type="checkbox">'), t;
}
function Toe(n) {
  var e = new n("html_inline", "", 0);
  return e.content = "<label>", e;
}
function Ooe(n) {
  var e = new n("html_inline", "", 0);
  return e.content = "</label>", e;
}
function Moe(n, e, t) {
  var r = new t("html_inline", "", 0);
  return r.content = '<label class="task-list-item-label" for="' + e + '">' + n + "</label>", r.attrs = [{ for: e }], r;
}
function Doe(n) {
  return n.type === "inline";
}
function _oe(n) {
  return n.type === "paragraph_open";
}
function Noe(n) {
  return n.type === "list_item_open";
}
function Roe(n) {
  return n.content.indexOf("[ ] ") === 0 || n.content.indexOf("[x] ") === 0 || n.content.indexOf("[X] ") === 0;
}
const Loe = /* @__PURE__ */ Hm(woe);
function ip(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function rt(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ip(Object(t), !0).forEach(function(r) {
      vi(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : ip(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function uu(n, e) {
  if (!(n instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function ap(n, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, pg(r.key), r);
  }
}
function du(n, e, t) {
  return e && ap(n.prototype, e), t && ap(n, t), Object.defineProperty(n, "prototype", {
    writable: !1
  }), n;
}
function vi(n, e, t) {
  return e = pg(e), e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function Poe(n, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function");
  n.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: n,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(n, "prototype", {
    writable: !1
  }), e && Yl(n, e);
}
function ur(n) {
  return ur = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, ur(n);
}
function Yl(n, e) {
  return Yl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Yl(n, e);
}
function Ioe() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Boe(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function Foe(n, e) {
  if (e && (typeof e == "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Boe(n);
}
function qoe(n) {
  var e = Ioe();
  return function() {
    var r = ur(n), o;
    if (e) {
      var s = ur(this).constructor;
      o = Reflect.construct(r, arguments, s);
    } else
      o = r.apply(this, arguments);
    return Foe(this, o);
  };
}
function zoe(n, e) {
  for (; !Object.prototype.hasOwnProperty.call(n, e) && (n = ur(n), n !== null); )
    ;
  return n;
}
function Do() {
  return typeof Reflect < "u" && Reflect.get ? Do = Reflect.get.bind() : Do = function(e, t, r) {
    var o = zoe(e, t);
    if (o) {
      var s = Object.getOwnPropertyDescriptor(o, t);
      return s.get ? s.get.call(arguments.length < 3 ? e : r) : s.value;
    }
  }, Do.apply(this, arguments);
}
function fu(n) {
  return $oe(n) || Hoe(n) || joe(n) || Voe();
}
function $oe(n) {
  if (Array.isArray(n))
    return Xl(n);
}
function Hoe(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null)
    return Array.from(n);
}
function joe(n, e) {
  if (n) {
    if (typeof n == "string")
      return Xl(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set")
      return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Xl(n, e);
  }
}
function Xl(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, r = new Array(e); t < e; t++)
    r[t] = n[t];
  return r;
}
function Voe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Uoe(n, e) {
  if (typeof n != "object" || n === null)
    return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e || "default");
    if (typeof r != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function pg(n) {
  var e = Uoe(n, "string");
  return typeof e == "symbol" ? e : String(e);
}
var Woe = ye.create({
  name: "markdownTightLists",
  addOptions: function() {
    return {
      tight: !0,
      tightClass: "tight",
      listTypes: ["bulletList", "orderedList"]
    };
  },
  addGlobalAttributes: function() {
    var e = this;
    return [{
      types: this.options.listTypes,
      attributes: {
        tight: {
          default: this.options.tight,
          parseHTML: function(r) {
            return r.getAttribute("data-tight") === "true" || !r.querySelector("p");
          },
          renderHTML: function(r) {
            return {
              class: r.tight ? e.options.tightClass : null,
              "data-tight": r.tight ? "true" : null
            };
          }
        }
      }
    }];
  },
  addCommands: function() {
    var e = this;
    return {
      toggleTight: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        return function(o) {
          var s = o.editor, i = o.commands;
          function a(l) {
            if (!s.isActive(l))
              return !1;
            var c = s.getAttributes(l);
            return i.updateAttributes(l, {
              tight: r ?? !(c != null && c.tight)
            });
          }
          return e.options.listTypes.some(function(l) {
            return a(l);
          });
        };
      }
    };
  }
}), lp = cu();
function hg(n, e) {
  lp.inline.State.prototype.scanDelims.call({
    src: n,
    posMax: n.length
  });
  var t = new lp.inline.State(n, null, null, []);
  return t.scanDelims(e, !0);
}
function mg(n, e, t, r) {
  var o = n.substring(0, t) + n.substring(t + e.length);
  return o = o.substring(0, t + r) + e + o.substring(t + r), o;
}
function Koe(n, e, t, r) {
  for (var o = t, s = n; o < r && !hg(s, o).can_open; )
    s = mg(s, e, o, 1), o++;
  return {
    text: s,
    from: o,
    to: r
  };
}
function Joe(n, e, t, r) {
  for (var o = r, s = n; o > t && !hg(s, o).can_close; )
    s = mg(s, e, o, -1), o--;
  return {
    text: s,
    from: t,
    to: o
  };
}
function Goe(n, e, t, r) {
  var o = {
    text: n,
    from: t,
    to: r
  };
  return o = Koe(o.text, e, o.from, o.to), o = Joe(o.text, e, o.from, o.to), o.to - o.from < e.length + 1 && (o.text = o.text.substring(0, o.from) + o.text.substring(o.to + e.length)), o.text;
}
var Zoe = /* @__PURE__ */ function(n) {
  Poe(t, n);
  var e = qoe(t);
  function t(r, o, s) {
    var i;
    return uu(this, t), i = e.call(this, r, o, s ?? {}), i.inlines = [], i;
  }
  return du(t, [{
    key: "render",
    value: function(o, s, i) {
      Do(ur(t.prototype), "render", this).call(this, o, s, i);
      var a = this.inlines[this.inlines.length - 1];
      if (a != null && a.start && a !== null && a !== void 0 && a.end) {
        var l = this.normalizeInline(a), c = l.delimiter, u = l.start, d = l.end;
        this.out = Goe(this.out, c, u, d), this.inlines.pop();
      }
    }
  }, {
    key: "markString",
    value: function(o, s, i, a) {
      var l = this.marks[o.type.name];
      if (l.expelEnclosingWhitespace)
        if (s)
          this.inlines.push({
            start: this.out.length,
            delimiter: l.open
          });
        else {
          var c = this.inlines.pop();
          this.inlines.push(rt(rt({}, c), {}, {
            end: this.out.length
          }));
        }
      return Do(ur(t.prototype), "markString", this).call(this, o, s, i, a);
    }
  }, {
    key: "normalizeInline",
    value: function(o) {
      var s = o.start;
      for (o.end; this.out.charAt(s).match(/\s/); )
        s++;
      return rt(rt({}, o), {}, {
        start: s
      });
    }
  }]), t;
}(ug), gg = ke.create({
  name: "markdownHTMLMark",
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: {
          open: function(t, r) {
            var o, s;
            return this.editor.storage.markdown.options.html ? (o = (s = cp(r)) === null || s === void 0 ? void 0 : s[0]) !== null && o !== void 0 ? o : "" : (console.warn('Tiptap Markdown: "'.concat(r.type.name, '" mark is only available in html mode')), "");
          },
          close: function(t, r) {
            var o, s;
            return this.editor.storage.markdown.options.html && (o = (s = cp(r)) === null || s === void 0 ? void 0 : s[1]) !== null && o !== void 0 ? o : "";
          }
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
});
function cp(n) {
  var e = n.type.schema, t = e.text(" ", [n]), r = Lc(M.from(t), e), o = r.match(/^(<.*?>) (<\/.*?>)$/);
  return o ? [o[1], o[2]] : null;
}
function pu(n) {
  var e = "<body>".concat(n, "</body>");
  return new window.DOMParser().parseFromString(e, "text/html").body;
}
function Yoe(n) {
  return n == null ? void 0 : n.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Xoe(n) {
  for (var e = n.parentElement, t = e.cloneNode(); e.firstChild && e.firstChild !== n; )
    t.appendChild(e.firstChild);
  t.childNodes.length > 0 && e.parentElement.insertBefore(t, e), e.parentElement.insertBefore(n, e), e.childNodes.length === 0 && e.remove();
}
function Qoe(n) {
  for (var e = n.parentNode; n.firstChild; )
    e.insertBefore(n.firstChild, n);
  e.removeChild(n);
}
var hu = se.create({
  name: "markdownHTMLNode",
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r, o) {
          this.editor.storage.markdown.options.html ? t.write(ese(r, o)) : (console.warn('Tiptap Markdown: "'.concat(r.type.name, '" node is only available in html mode')), t.write("[".concat(r.type.name, "]"))), r.isBlock && t.closeBlock(r);
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
});
function ese(n, e) {
  var t = n.type.schema, r = Lc(M.from(n), t);
  return n.isBlock && e.type.name === t.topNodeType.name ? tse(r) : r;
}
function tse(n) {
  var e = pu(n), t = e.firstElementChild;
  return t.innerHTML = t.innerHTML.trim() ? `
`.concat(t.innerHTML, `
`) : `
`, t.outerHTML;
}
var nse = se.create({
  name: "blockquote"
}), rse = nse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.nodes.blockquote,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), ose = se.create({
  name: "bulletList"
}), yg = ose.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r) {
          var o = this;
          return t.renderList(r, "  ", function() {
            return (o.editor.storage.markdown.options.bulletListMarker || "-") + " ";
          });
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), sse = se.create({
  name: "codeBlock"
}), ise = sse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r) {
          t.write("```" + (r.attrs.language || "") + `
`), t.text(r.textContent, !1), t.ensureNewLine(), t.write("```"), t.closeBlock(r);
        },
        parse: {
          setup: function(t) {
            var r;
            t.set({
              langPrefix: (r = this.options.languageClassPrefix) !== null && r !== void 0 ? r : "language-"
            });
          },
          updateDOM: function(t) {
            t.innerHTML = t.innerHTML.replace(/\n<\/code><\/pre>/g, "</code></pre>");
          }
        }
      }
    };
  }
}), ase = se.create({
  name: "hardBreak"
}), bg = ase.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.nodes.hard_break,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), lse = se.create({
  name: "heading"
}), cse = lse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.nodes.heading,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), use = se.create({
  name: "horizontalRule"
}), dse = use.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.nodes.horizontal_rule,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), fse = se.create({
  name: "image"
}), pse = fse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.nodes.image,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), hse = se.create({
  name: "listItem"
}), mse = hse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.nodes.list_item,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), gse = se.create({
  name: "orderedList"
}), yse = gse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.nodes.ordered_list,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), bse = se.create({
  name: "paragraph"
}), vse = bse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.nodes.paragraph,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
});
function il(n) {
  var e, t;
  return (e = n == null || (t = n.content) === null || t === void 0 ? void 0 : t.content) !== null && e !== void 0 ? e : [];
}
var kse = se.create({
  name: "table"
}), xse = kse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r, o) {
          if (!wse(r)) {
            hu.storage.markdown.serialize.call(this, t, r, o);
            return;
          }
          r.forEach(function(s, i, a) {
            if (t.write("| "), s.forEach(function(c, u, d) {
              d && t.write(" | ");
              var f = c.firstChild;
              f.textContent.trim() && t.renderInline(f);
            }), t.write(" |"), t.ensureNewLine(), !a) {
              var l = Array.from({
                length: s.childCount
              }).map(function() {
                return "---";
              }).join(" | ");
              t.write("| ".concat(l, " |")), t.ensureNewLine();
            }
          }), t.closeBlock(r);
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
});
function up(n) {
  return n.attrs.colspan > 1 || n.attrs.rowspan > 1;
}
function wse(n) {
  var e = il(n), t = e[0], r = e.slice(1);
  return !(il(t).some(function(o) {
    return o.type.name !== "tableHeader" || up(o);
  }) || r.some(function(o) {
    return il(o).some(function(s) {
      return s.type.name === "tableHeader" || up(s);
    });
  }));
}
var Sse = se.create({
  name: "taskItem"
}), Cse = Sse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r) {
          var o = r.attrs.checked ? "[x]" : "[ ]";
          t.write("".concat(o, " ")), t.renderContent(r);
        },
        parse: {
          updateDOM: function(t) {
            fu(t.querySelectorAll(".task-list-item")).forEach(function(r) {
              var o = r.querySelector("input");
              r.setAttribute("data-type", "taskItem"), o && (r.setAttribute("data-checked", o.checked), o.remove());
            });
          }
        }
      }
    };
  }
}), Ese = se.create({
  name: "taskList"
}), Ase = Ese.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: yg.storage.markdown.serialize,
        parse: {
          setup: function(t) {
            t.use(Loe);
          },
          updateDOM: function(t) {
            fu(t.querySelectorAll(".contains-task-list")).forEach(function(r) {
              r.setAttribute("data-type", "taskList");
            });
          }
        }
      }
    };
  }
}), Tse = se.create({
  name: "text"
}), Ose = Tse.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r) {
          t.text(Yoe(r.text));
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Mse = ke.create({
  name: "bold"
}), Dse = Mse.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.marks.strong,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), _se = ke.create({
  name: "code"
}), Nse = _se.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.marks.code,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Rse = ke.create({
  name: "italic"
}), Lse = Rse.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.marks.em,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Pse = ke.create({
  name: "link"
}), Ise = Pse.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: bt.marks.link,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Bse = ke.create({
  name: "strike"
}), Fse = Bse.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: {
          open: "~~",
          close: "~~",
          expelEnclosingWhitespace: !0
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), qse = [rse, yg, ise, bg, cse, dse, hu, pse, mse, yse, vse, xse, Cse, Ase, Ose, Dse, Nse, gg, Lse, Ise, Fse];
function ki(n) {
  var e, t, r = (e = n.storage) === null || e === void 0 ? void 0 : e.markdown, o = (t = qse.find(function(s) {
    return s.name === n.name;
  })) === null || t === void 0 ? void 0 : t.storage.markdown;
  return r || o ? rt(rt({}, o), r) : null;
}
var zse = /* @__PURE__ */ function() {
  function n(e) {
    uu(this, n), vi(this, "editor", null), this.editor = e;
  }
  return du(n, [{
    key: "serialize",
    value: function(t) {
      var r = new Zoe(this.nodes, this.marks, {
        hardBreakNodeName: bg.name
      });
      return r.renderContent(t), r.out;
    }
  }, {
    key: "nodes",
    get: function() {
      var t = this, r;
      return rt(rt({}, Object.fromEntries(Object.keys(this.editor.schema.nodes).map(function(o) {
        return [o, t.serializeNode(hu)];
      }))), Object.fromEntries((r = this.editor.extensionManager.extensions.filter(function(o) {
        return o.type === "node" && t.serializeNode(o);
      }).map(function(o) {
        return [o.name, t.serializeNode(o)];
      })) !== null && r !== void 0 ? r : []));
    }
  }, {
    key: "marks",
    get: function() {
      var t = this, r;
      return rt(rt({}, Object.fromEntries(Object.keys(this.editor.schema.marks).map(function(o) {
        return [o, t.serializeMark(gg)];
      }))), Object.fromEntries((r = this.editor.extensionManager.extensions.filter(function(o) {
        return o.type === "mark" && t.serializeMark(o);
      }).map(function(o) {
        return [o.name, t.serializeMark(o)];
      })) !== null && r !== void 0 ? r : []));
    }
  }, {
    key: "serializeNode",
    value: function(t) {
      var r, o;
      return (r = ki(t)) === null || r === void 0 || (o = r.serialize) === null || o === void 0 ? void 0 : o.bind({
        editor: this.editor,
        options: t.options
      });
    }
  }, {
    key: "serializeMark",
    value: function(t) {
      var r, o = (r = ki(t)) === null || r === void 0 ? void 0 : r.serialize;
      return o ? rt(rt({}, o), {}, {
        open: typeof o.open == "function" ? o.open.bind({
          editor: this.editor,
          options: t.options
        }) : o.open,
        close: typeof o.close == "function" ? o.close.bind({
          editor: this.editor,
          options: t.options
        }) : o.close
      }) : null;
    }
  }]), n;
}(), $se = /* @__PURE__ */ function() {
  function n(e, t) {
    var r = t.html, o = t.linkify, s = t.breaks;
    uu(this, n), vi(this, "editor", null), vi(this, "md", null), this.editor = e, this.md = cu({
      html: r,
      linkify: o,
      breaks: s
    });
  }
  return du(n, [{
    key: "parse",
    value: function(t) {
      var r = this, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = o.inline;
      if (typeof t == "string") {
        var i = this.md;
        this.editor.extensionManager.extensions.forEach(function(c) {
          var u, d, f;
          return (u = ki(c)) === null || u === void 0 || (d = u.parse) === null || d === void 0 || (f = d.setup) === null || f === void 0 ? void 0 : f.call({
            editor: r.editor,
            options: c.options
          }, i);
        });
        var a = i.render(t), l = pu(a);
        return this.editor.extensionManager.extensions.forEach(function(c) {
          var u, d, f;
          return (u = ki(c)) === null || u === void 0 || (d = u.parse) === null || d === void 0 || (f = d.updateDOM) === null || f === void 0 ? void 0 : f.call({
            editor: r.editor,
            options: c.options
          }, l);
        }), this.normalizeDOM(l, {
          inline: s,
          content: t
        }), l.innerHTML;
      }
      return t;
    }
  }, {
    key: "normalizeDOM",
    value: function(t) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = r.inline, s = r.content;
      return this.normalizeBlocks(t), o && this.normalizeInline(t, s), t;
    }
  }, {
    key: "normalizeBlocks",
    value: function(t) {
      var r = Object.values(this.editor.schema.nodes).filter(function(s) {
        return s.isBlock;
      }), o = r.map(function(s) {
        var i;
        return (i = s.spec.parseDOM) === null || i === void 0 ? void 0 : i.map(function(a) {
          return a.tag;
        });
      }).flat().filter(Boolean).join(",");
      o && fu(t.querySelectorAll(o)).forEach(function(s) {
        s.parentElement.matches("p") && Xoe(s);
      });
    }
  }, {
    key: "normalizeInline",
    value: function(t, r) {
      var o;
      if ((o = t.firstElementChild) !== null && o !== void 0 && o.matches("p")) {
        var s, i, a, l, c = t.firstElementChild, u = c.nextSibling, d = c.nextElementSibling, f = (s = (i = r.match(/^\s+/)) === null || i === void 0 ? void 0 : i[0]) !== null && s !== void 0 ? s : "", p = d ? "" : (a = (l = r.match(/\s+$/)) === null || l === void 0 ? void 0 : l[0]) !== null && a !== void 0 ? a : "";
        if ((u == null ? void 0 : u.nodeType) === Node.TEXT_NODE && (u.textContent = u.textContent.replace(/^\n/, "")), r.match(/^\n\n/)) {
          c.innerHTML = "".concat(c.innerHTML).concat(p);
          return;
        }
        Qoe(c), t.innerHTML = "".concat(f).concat(t.innerHTML).concat(p);
      }
    }
  }]), n;
}(), Hse = ye.create({
  name: "markdownClipboard",
  addOptions: function() {
    return {
      transformPastedText: !1,
      transformCopiedText: !1
    };
  },
  addProseMirrorPlugins: function() {
    var e = this;
    return [new be({
      key: new Pe("markdownClipboard"),
      props: {
        clipboardTextParser: function(r, o, s) {
          if (s || !e.options.transformPastedText)
            return null;
          var i = e.editor.storage.markdown.parser.parse(r, {
            inline: !0
          });
          return rr.fromSchema(e.editor.schema).parseSlice(pu(i), {
            preserveWhitespace: !0
          });
        },
        /**
         * @param {import('prosemirror-model').Slice} slice
         */
        clipboardTextSerializer: function(r) {
          return e.options.transformCopiedText ? e.editor.storage.markdown.serializer.serialize(r.content) : null;
        }
      }
    })];
  }
}), jse = ye.create({
  name: "markdown",
  priority: 50,
  addOptions: function() {
    return {
      html: !0,
      tightLists: !0,
      tightListClass: "tight",
      bulletListMarker: "-",
      linkify: !1,
      breaks: !1,
      transformPastedText: !1,
      transformCopiedText: !1
    };
  },
  addCommands: function() {
    var e = tm.Commands.config.addCommands();
    return {
      setContent: function(r, o, s) {
        return function(i) {
          return e.setContent(i.editor.storage.markdown.parser.parse(r), o, s)(i);
        };
      },
      insertContentAt: function(r, o, s) {
        return function(i) {
          return e.insertContentAt(r, i.editor.storage.markdown.parser.parse(o, {
            inline: !0
          }), s)(i);
        };
      }
    };
  },
  onBeforeCreate: function() {
    var e = this;
    this.editor.storage.markdown = {
      options: rt({}, this.options),
      parser: new $se(this.editor, this.options),
      serializer: new zse(this.editor),
      getMarkdown: function() {
        return e.editor.storage.markdown.serializer.serialize(e.editor.state.doc);
      }
    }, this.editor.options.initialContent = this.editor.options.content, this.editor.options.content = this.editor.storage.markdown.parser.parse(this.editor.options.content);
  },
  onCreate: function() {
    this.editor.options.content = this.editor.options.initialContent, delete this.editor.options.initialContent;
  },
  addStorage: function() {
    return {
      /// storage will be defined in onBeforeCreate() to prevent initial object overriding
    };
  },
  addExtensions: function() {
    return [Woe.configure({
      tight: this.options.tightLists,
      tightClass: this.options.tightListClass
    }), Hse.configure({
      transformPastedText: this.options.transformPastedText,
      transformCopiedText: this.options.transformCopiedText
    })];
  }
});
const Vse = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))$/, Use = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))/g, Wse = ke.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: !1,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return this.options.multicolor ? {
      color: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-color") || n.style.backgroundColor,
        renderHTML: (n) => n.color ? {
          "data-color": n.color,
          style: `background-color: ${n.color}; color: inherit`
        } : {}
      }
    } : {};
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["mark", de(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setHighlight: (n) => ({ commands: e }) => e.setMark(this.name, n),
      toggleHighlight: (n) => ({ commands: e }) => e.toggleMark(this.name, n),
      unsetHighlight: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      ir({
        find: Vse,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      ar({
        find: Use,
        type: this.type
      })
    ];
  }
});
function Kse(n) {
  var e;
  const { char: t, allowSpaces: r, allowedPrefixes: o, startOfLine: s, $position: i } = n, a = g1(t), l = new RegExp(`\\s${a}$`), c = s ? "^" : "", u = r ? new RegExp(`${c}${a}.*?(?=\\s${a}|$)`, "gm") : new RegExp(`${c}(?:^)?${a}[^\\s${a}]*`, "gm"), d = ((e = i.nodeBefore) === null || e === void 0 ? void 0 : e.isText) && i.nodeBefore.text;
  if (!d)
    return null;
  const f = i.pos - d.length, p = Array.from(d.matchAll(u)).pop();
  if (!p || p.input === void 0 || p.index === void 0)
    return null;
  const h = p.input.slice(Math.max(0, p.index - 1), p.index), m = new RegExp(`^[${o == null ? void 0 : o.join("")}\0]?$`).test(h);
  if (o !== null && !m)
    return null;
  const g = f + p.index;
  let b = g + p[0].length;
  return r && l.test(d.slice(b - 1, b + 1)) && (p[0] += " ", b += 1), g < i.pos && b >= i.pos ? {
    range: {
      from: g,
      to: b
    },
    query: p[0].slice(t.length),
    text: p[0]
  } : null;
}
const Jse = new Pe("suggestion");
function Gse({ pluginKey: n = Jse, editor: e, char: t = "@", allowSpaces: r = !1, allowedPrefixes: o = [" "], startOfLine: s = !1, decorationTag: i = "span", decorationClass: a = "suggestion", command: l = () => null, items: c = () => [], render: u = () => ({}), allow: d = () => !0 }) {
  let f;
  const p = u == null ? void 0 : u(), h = new be({
    key: n,
    view() {
      return {
        update: async (m, g) => {
          var b, v, x, y, w, k, S;
          const E = (b = this.key) === null || b === void 0 ? void 0 : b.getState(g), T = (v = this.key) === null || v === void 0 ? void 0 : v.getState(m.state), D = E.active && T.active && E.range.from !== T.range.from, N = !E.active && T.active, z = E.active && !T.active, I = !N && !z && E.query !== T.query, O = N || D, F = I && !D, L = z || D;
          if (!O && !F && !L)
            return;
          const $ = L && !O ? E : T, ee = m.dom.querySelector(`[data-decoration-id="${$.decorationId}"]`);
          f = {
            editor: e,
            range: $.range,
            query: $.query,
            text: $.text,
            items: [],
            command: (ne) => {
              l({
                editor: e,
                range: $.range,
                props: ne
              });
            },
            decorationNode: ee,
            // virtual node for popper.js or tippy.js
            // this can be used for building popups without a DOM node
            clientRect: ee ? () => {
              var ne;
              const { decorationId: ve } = (ne = this.key) === null || ne === void 0 ? void 0 : ne.getState(e.state), Ce = m.dom.querySelector(`[data-decoration-id="${ve}"]`);
              return (Ce == null ? void 0 : Ce.getBoundingClientRect()) || null;
            } : null
          }, O && ((x = p == null ? void 0 : p.onBeforeStart) === null || x === void 0 || x.call(p, f)), F && ((y = p == null ? void 0 : p.onBeforeUpdate) === null || y === void 0 || y.call(p, f)), (F || O) && (f.items = await c({
            editor: e,
            query: $.query
          })), L && ((w = p == null ? void 0 : p.onExit) === null || w === void 0 || w.call(p, f)), F && ((k = p == null ? void 0 : p.onUpdate) === null || k === void 0 || k.call(p, f)), O && ((S = p == null ? void 0 : p.onStart) === null || S === void 0 || S.call(p, f));
        },
        destroy: () => {
          var m;
          f && ((m = p == null ? void 0 : p.onExit) === null || m === void 0 || m.call(p, f));
        }
      };
    },
    state: {
      // Initialize the plugin's internal state.
      init() {
        return {
          active: !1,
          range: {
            from: 0,
            to: 0
          },
          query: null,
          text: null,
          composing: !1
        };
      },
      // Apply changes to the plugin state from a view transaction.
      apply(m, g, b, v) {
        const { isEditable: x } = e, { composing: y } = e.view, { selection: w } = m, { empty: k, from: S } = w, E = { ...g };
        if (E.composing = y, x && (k || e.view.composing)) {
          (S < g.range.from || S > g.range.to) && !y && !g.composing && (E.active = !1);
          const T = Kse({
            char: t,
            allowSpaces: r,
            allowedPrefixes: o,
            startOfLine: s,
            $position: w.$from
          }), D = `id_${Math.floor(Math.random() * 4294967295)}`;
          T && d({ editor: e, state: v, range: T.range }) ? (E.active = !0, E.decorationId = g.decorationId ? g.decorationId : D, E.range = T.range, E.query = T.query, E.text = T.text) : E.active = !1;
        } else
          E.active = !1;
        return E.active || (E.decorationId = null, E.range = { from: 0, to: 0 }, E.query = null, E.text = null), E;
      }
    },
    props: {
      // Call the keydown hook if suggestion is active.
      handleKeyDown(m, g) {
        var b;
        const { active: v, range: x } = h.getState(m.state);
        return v && ((b = p == null ? void 0 : p.onKeyDown) === null || b === void 0 ? void 0 : b.call(p, { view: m, event: g, range: x })) || !1;
      },
      // Setup decorator on the currently active suggestion.
      decorations(m) {
        const { active: g, range: b, decorationId: v } = h.getState(m);
        return g ? me.create(m.doc, [
          $e.inline(b.from, b.to, {
            nodeName: i,
            class: a,
            "data-decoration-id": v
          })
        ]) : null;
      }
    }
  });
  return h;
}
var Os = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Zse = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Se = (n, e) => ({ size: t, strokeWidth: r = 2, absoluteStrokeWidth: o, color: s, ...i }, { attrs: a, slots: l }) => he(
  "svg",
  {
    ...Os,
    width: t || Os.width,
    height: t || Os.height,
    stroke: s || Os.stroke,
    "stroke-width": o ? Number(r) * 24 / Number(t) : r,
    ...a,
    class: ["lucide", `lucide-${Zse(n)}`, (a == null ? void 0 : a.class) || ""],
    ...i
  },
  [
    ...e.map((c) => he(...c)),
    ...l.default ? [l.default()] : []
  ]
), Yse = Se("BoldIcon", [
  ["path", { d: "M14 12a4 4 0 0 0 0-8H6v8", key: "v2sylx" }],
  ["path", { d: "M15 20a4 4 0 0 0 0-8H6v8Z", key: "1ef5ya" }]
]), vg = Se("CheckSquareIcon", [
  ["polyline", { points: "9 11 12 14 22 4", key: "19ybtz" }],
  [
    "path",
    {
      d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
      key: "1jnkn4"
    }
  ]
]), xi = Se("CheckIcon", [
  ["polyline", { points: "20 6 9 17 4 12", key: "10jjfj" }]
]), kg = Se("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]), mu = Se("CodeIcon", [
  ["polyline", { points: "16 18 22 12 16 6", key: "z7tu5w" }],
  ["polyline", { points: "8 6 2 12 8 18", key: "1eg1df" }]
]), xg = Se("Heading1Icon", [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["path", { d: "m17 12 3-2v8", key: "1hhhft" }]
]), wg = Se("Heading2Icon", [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["path", { d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1", key: "9jr5yi" }]
]), Sg = Se("Heading3Icon", [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  [
    "path",
    { d: "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2", key: "68ncm8" }
  ],
  ["path", { d: "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2", key: "1ejuhz" }]
]), Xse = Se("ImageIcon", [
  [
    "rect",
    {
      width: "18",
      height: "18",
      x: "3",
      y: "3",
      rx: "2",
      ry: "2",
      key: "1m3agn"
    }
  ],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]), Qse = Se("ItalicIcon", [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
]), Ql = Se("ListOrderedIcon", [
  ["line", { x1: "10", x2: "21", y1: "6", y2: "6", key: "76qw6h" }],
  ["line", { x1: "10", x2: "21", y1: "12", y2: "12", key: "16nom4" }],
  ["line", { x1: "10", x2: "21", y1: "18", y2: "18", key: "u3jurt" }],
  ["path", { d: "M4 6h1v4", key: "cnovpq" }],
  ["path", { d: "M4 10h2", key: "16xx2s" }],
  ["path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1", key: "m9a95d" }]
]), eie = Se("ListIcon", [
  ["line", { x1: "8", x2: "21", y1: "6", y2: "6", key: "7ey8pc" }],
  ["line", { x1: "8", x2: "21", y1: "12", y2: "12", key: "rjfblc" }],
  ["line", { x1: "8", x2: "21", y1: "18", y2: "18", key: "c3b1m8" }],
  ["line", { x1: "3", x2: "3.01", y1: "6", y2: "6", key: "1g7gq3" }],
  ["line", { x1: "3", x2: "3.01", y1: "12", y2: "12", key: "1pjlvk" }],
  ["line", { x1: "3", x2: "3.01", y1: "18", y2: "18", key: "28t2mc" }]
]), tie = Se("MessageSquarePlusIcon", [
  [
    "path",
    {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
      key: "1lielz"
    }
  ],
  ["line", { x1: "9", x2: "15", y1: "10", y2: "10", key: "1lj1wd" }],
  ["line", { x1: "12", x2: "12", y1: "7", y2: "13", key: "1cppfj" }]
]), nie = Se("SparklesIcon", [
  [
    "path",
    {
      d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
      key: "17u4zn"
    }
  ],
  ["path", { d: "M5 3v4", key: "bklmnn" }],
  ["path", { d: "M19 17v4", key: "iiml17" }],
  ["path", { d: "M3 5h4", key: "nem4j1" }],
  ["path", { d: "M17 19h4", key: "lbex7p" }]
]), rie = Se("StrikethroughIcon", [
  ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4", key: "43sutm" }],
  ["path", { d: "M14 12a4 4 0 0 1 0 8H6", key: "nlfj13" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
]), Cg = Se("TextQuoteIcon", [
  ["path", { d: "M17 6H3", key: "16j9eg" }],
  ["path", { d: "M21 12H8", key: "scolzb" }],
  ["path", { d: "M21 18H8", key: "1wfozv" }],
  ["path", { d: "M3 12v6", key: "fv4c87" }]
]), Eg = Se("TextIcon", [
  ["path", { d: "M17 6.1H3", key: "wptmhv" }],
  ["path", { d: "M21 12.1H3", key: "1j38uz" }],
  ["path", { d: "M15.1 18H3", key: "1nb16a" }]
]), oie = Se("TrashIcon", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }]
]), sie = Se("UnderlineIcon", [
  ["path", { d: "M6 4v6a6 6 0 0 0 12 0V4", key: "9kb039" }],
  ["line", { x1: "4", x2: "20", y1: "20", y2: "20", key: "nun2al" }]
]), iie = /* @__PURE__ */ J("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1), aie = /* @__PURE__ */ J("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "currentFill"
}, null, -1), lie = [
  iie,
  aie
], cie = /* @__PURE__ */ fe({
  __name: "loadingCircle",
  props: {
    dimensions: {
      type: String,
      default: "h-4 w-4",
      required: !1
    }
  },
  setup(n) {
    return (e, t) => (V(), re("svg", {
      "aria-hidden": "true",
      class: er(["animate-spin fill-stone-600 text-stone-200", n.dimensions]),
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, lie, 2));
  }
}), ec = (n, {
  chars: e,
  offset: t = 0
}) => n.state.doc.textBetween(
  Math.max(0, n.state.selection.from - e),
  n.state.selection.from - t,
  `
`
);
function Ag(n, e) {
  return function() {
    return n.apply(e, arguments);
  };
}
const { toString: uie } = Object.prototype, { getPrototypeOf: gu } = Object, Qi = ((n) => (e) => {
  const t = uie.call(e);
  return n[t] || (n[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ot = (n) => (n = n.toLowerCase(), (e) => Qi(e) === n), ea = (n) => (e) => typeof e === n, { isArray: no } = Array, Vo = ea("undefined");
function die(n) {
  return n !== null && !Vo(n) && n.constructor !== null && !Vo(n.constructor) && st(n.constructor.isBuffer) && n.constructor.isBuffer(n);
}
const Tg = Ot("ArrayBuffer");
function fie(n) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(n) : e = n && n.buffer && Tg(n.buffer), e;
}
const pie = ea("string"), st = ea("function"), Og = ea("number"), ta = (n) => n !== null && typeof n == "object", hie = (n) => n === !0 || n === !1, Is = (n) => {
  if (Qi(n) !== "object")
    return !1;
  const e = gu(n);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n);
}, mie = Ot("Date"), gie = Ot("File"), yie = Ot("Blob"), bie = Ot("FileList"), vie = (n) => ta(n) && st(n.pipe), kie = (n) => {
  let e;
  return n && (typeof FormData == "function" && n instanceof FormData || st(n.append) && ((e = Qi(n)) === "formdata" || // detect form-data instance
  e === "object" && st(n.toString) && n.toString() === "[object FormData]"));
}, xie = Ot("URLSearchParams"), [wie, Sie, Cie, Eie] = ["ReadableStream", "Request", "Response", "Headers"].map(Ot), Aie = (n) => n.trim ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function es(n, e, { allOwnKeys: t = !1 } = {}) {
  if (n === null || typeof n > "u")
    return;
  let r, o;
  if (typeof n != "object" && (n = [n]), no(n))
    for (r = 0, o = n.length; r < o; r++)
      e.call(null, n[r], r, n);
  else {
    const s = t ? Object.getOwnPropertyNames(n) : Object.keys(n), i = s.length;
    let a;
    for (r = 0; r < i; r++)
      a = s[r], e.call(null, n[a], a, n);
  }
}
function Mg(n, e) {
  e = e.toLowerCase();
  const t = Object.keys(n);
  let r = t.length, o;
  for (; r-- > 0; )
    if (o = t[r], e === o.toLowerCase())
      return o;
  return null;
}
const jn = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Dg = (n) => !Vo(n) && n !== jn;
function tc() {
  const { caseless: n } = Dg(this) && this || {}, e = {}, t = (r, o) => {
    const s = n && Mg(e, o) || o;
    Is(e[s]) && Is(r) ? e[s] = tc(e[s], r) : Is(r) ? e[s] = tc({}, r) : no(r) ? e[s] = r.slice() : e[s] = r;
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && es(arguments[r], t);
  return e;
}
const Tie = (n, e, t, { allOwnKeys: r } = {}) => (es(e, (o, s) => {
  t && st(o) ? n[s] = Ag(o, t) : n[s] = o;
}, { allOwnKeys: r }), n), Oie = (n) => (n.charCodeAt(0) === 65279 && (n = n.slice(1)), n), Mie = (n, e, t, r) => {
  n.prototype = Object.create(e.prototype, r), n.prototype.constructor = n, Object.defineProperty(n, "super", {
    value: e.prototype
  }), t && Object.assign(n.prototype, t);
}, Die = (n, e, t, r) => {
  let o, s, i;
  const a = {};
  if (e = e || {}, n == null)
    return e;
  do {
    for (o = Object.getOwnPropertyNames(n), s = o.length; s-- > 0; )
      i = o[s], (!r || r(i, n, e)) && !a[i] && (e[i] = n[i], a[i] = !0);
    n = t !== !1 && gu(n);
  } while (n && (!t || t(n, e)) && n !== Object.prototype);
  return e;
}, _ie = (n, e, t) => {
  n = String(n), (t === void 0 || t > n.length) && (t = n.length), t -= e.length;
  const r = n.indexOf(e, t);
  return r !== -1 && r === t;
}, Nie = (n) => {
  if (!n)
    return null;
  if (no(n))
    return n;
  let e = n.length;
  if (!Og(e))
    return null;
  const t = new Array(e);
  for (; e-- > 0; )
    t[e] = n[e];
  return t;
}, Rie = ((n) => (e) => n && e instanceof n)(typeof Uint8Array < "u" && gu(Uint8Array)), Lie = (n, e) => {
  const r = (n && n[Symbol.iterator]).call(n);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const s = o.value;
    e.call(n, s[0], s[1]);
  }
}, Pie = (n, e) => {
  let t;
  const r = [];
  for (; (t = n.exec(e)) !== null; )
    r.push(t);
  return r;
}, Iie = Ot("HTMLFormElement"), Bie = (n) => n.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, r, o) {
    return r.toUpperCase() + o;
  }
), dp = (({ hasOwnProperty: n }) => (e, t) => n.call(e, t))(Object.prototype), Fie = Ot("RegExp"), _g = (n, e) => {
  const t = Object.getOwnPropertyDescriptors(n), r = {};
  es(t, (o, s) => {
    let i;
    (i = e(o, s, n)) !== !1 && (r[s] = i || o);
  }), Object.defineProperties(n, r);
}, qie = (n) => {
  _g(n, (e, t) => {
    if (st(n) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const r = n[t];
    if (st(r)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, zie = (n, e) => {
  const t = {}, r = (o) => {
    o.forEach((s) => {
      t[s] = !0;
    });
  };
  return no(n) ? r(n) : r(String(n).split(e)), t;
}, $ie = () => {
}, Hie = (n, e) => n != null && Number.isFinite(n = +n) ? n : e, al = "abcdefghijklmnopqrstuvwxyz", fp = "0123456789", Ng = {
  DIGIT: fp,
  ALPHA: al,
  ALPHA_DIGIT: al + al.toUpperCase() + fp
}, jie = (n = 16, e = Ng.ALPHA_DIGIT) => {
  let t = "";
  const { length: r } = e;
  for (; n--; )
    t += e[Math.random() * r | 0];
  return t;
};
function Vie(n) {
  return !!(n && st(n.append) && n[Symbol.toStringTag] === "FormData" && n[Symbol.iterator]);
}
const Uie = (n) => {
  const e = new Array(10), t = (r, o) => {
    if (ta(r)) {
      if (e.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        e[o] = r;
        const s = no(r) ? [] : {};
        return es(r, (i, a) => {
          const l = t(i, o + 1);
          !Vo(l) && (s[a] = l);
        }), e[o] = void 0, s;
      }
    }
    return r;
  };
  return t(n, 0);
}, Wie = Ot("AsyncFunction"), Kie = (n) => n && (ta(n) || st(n)) && st(n.then) && st(n.catch), Rg = ((n, e) => n ? setImmediate : e ? ((t, r) => (jn.addEventListener("message", ({ source: o, data: s }) => {
  o === jn && s === t && r.length && r.shift()();
}, !1), (o) => {
  r.push(o), jn.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  st(jn.postMessage)
), Jie = typeof queueMicrotask < "u" ? queueMicrotask.bind(jn) : typeof process < "u" && process.nextTick || Rg, C = {
  isArray: no,
  isArrayBuffer: Tg,
  isBuffer: die,
  isFormData: kie,
  isArrayBufferView: fie,
  isString: pie,
  isNumber: Og,
  isBoolean: hie,
  isObject: ta,
  isPlainObject: Is,
  isReadableStream: wie,
  isRequest: Sie,
  isResponse: Cie,
  isHeaders: Eie,
  isUndefined: Vo,
  isDate: mie,
  isFile: gie,
  isBlob: yie,
  isRegExp: Fie,
  isFunction: st,
  isStream: vie,
  isURLSearchParams: xie,
  isTypedArray: Rie,
  isFileList: bie,
  forEach: es,
  merge: tc,
  extend: Tie,
  trim: Aie,
  stripBOM: Oie,
  inherits: Mie,
  toFlatObject: Die,
  kindOf: Qi,
  kindOfTest: Ot,
  endsWith: _ie,
  toArray: Nie,
  forEachEntry: Lie,
  matchAll: Pie,
  isHTMLForm: Iie,
  hasOwnProperty: dp,
  hasOwnProp: dp,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: _g,
  freezeMethods: qie,
  toObjectSet: zie,
  toCamelCase: Bie,
  noop: $ie,
  toFiniteNumber: Hie,
  findKey: Mg,
  global: jn,
  isContextDefined: Dg,
  ALPHABET: Ng,
  generateString: jie,
  isSpecCompliantForm: Vie,
  toJSONObject: Uie,
  isAsyncFn: Wie,
  isThenable: Kie,
  setImmediate: Rg,
  asap: Jie
};
function K(n, e, t, r, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = n, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), r && (this.request = r), o && (this.response = o, this.status = o.status ? o.status : null);
}
C.inherits(K, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: C.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Lg = K.prototype, Pg = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((n) => {
  Pg[n] = { value: n };
});
Object.defineProperties(K, Pg);
Object.defineProperty(Lg, "isAxiosError", { value: !0 });
K.from = (n, e, t, r, o, s) => {
  const i = Object.create(Lg);
  return C.toFlatObject(n, i, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), K.call(i, n.message, e, t, r, o), i.cause = n, i.name = n.name, s && Object.assign(i, s), i;
};
const Gie = null;
function nc(n) {
  return C.isPlainObject(n) || C.isArray(n);
}
function Ig(n) {
  return C.endsWith(n, "[]") ? n.slice(0, -2) : n;
}
function pp(n, e, t) {
  return n ? n.concat(e).map(function(o, s) {
    return o = Ig(o), !t && s ? "[" + o + "]" : o;
  }).join(t ? "." : "") : e;
}
function Zie(n) {
  return C.isArray(n) && !n.some(nc);
}
const Yie = C.toFlatObject(C, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function na(n, e, t) {
  if (!C.isObject(n))
    throw new TypeError("target must be an object");
  e = e || new FormData(), t = C.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(m, g) {
    return !C.isUndefined(g[m]);
  });
  const r = t.metaTokens, o = t.visitor || u, s = t.dots, i = t.indexes, l = (t.Blob || typeof Blob < "u" && Blob) && C.isSpecCompliantForm(e);
  if (!C.isFunction(o))
    throw new TypeError("visitor must be a function");
  function c(h) {
    if (h === null)
      return "";
    if (C.isDate(h))
      return h.toISOString();
    if (!l && C.isBlob(h))
      throw new K("Blob is not supported. Use a Buffer instead.");
    return C.isArrayBuffer(h) || C.isTypedArray(h) ? l && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function u(h, m, g) {
    let b = h;
    if (h && !g && typeof h == "object") {
      if (C.endsWith(m, "{}"))
        m = r ? m : m.slice(0, -2), h = JSON.stringify(h);
      else if (C.isArray(h) && Zie(h) || (C.isFileList(h) || C.endsWith(m, "[]")) && (b = C.toArray(h)))
        return m = Ig(m), b.forEach(function(x, y) {
          !(C.isUndefined(x) || x === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? pp([m], y, s) : i === null ? m : m + "[]",
            c(x)
          );
        }), !1;
    }
    return nc(h) ? !0 : (e.append(pp(g, m, s), c(h)), !1);
  }
  const d = [], f = Object.assign(Yie, {
    defaultVisitor: u,
    convertValue: c,
    isVisitable: nc
  });
  function p(h, m) {
    if (!C.isUndefined(h)) {
      if (d.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      d.push(h), C.forEach(h, function(b, v) {
        (!(C.isUndefined(b) || b === null) && o.call(
          e,
          b,
          C.isString(v) ? v.trim() : v,
          m,
          f
        )) === !0 && p(b, m ? m.concat(v) : [v]);
      }), d.pop();
    }
  }
  if (!C.isObject(n))
    throw new TypeError("data must be an object");
  return p(n), e;
}
function hp(n) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g, function(r) {
    return e[r];
  });
}
function yu(n, e) {
  this._pairs = [], n && na(n, this, e);
}
const Bg = yu.prototype;
Bg.append = function(e, t) {
  this._pairs.push([e, t]);
};
Bg.toString = function(e) {
  const t = e ? function(r) {
    return e.call(this, r, hp);
  } : hp;
  return this._pairs.map(function(o) {
    return t(o[0]) + "=" + t(o[1]);
  }, "").join("&");
};
function Xie(n) {
  return encodeURIComponent(n).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Fg(n, e, t) {
  if (!e)
    return n;
  const r = t && t.encode || Xie, o = t && t.serialize;
  let s;
  if (o ? s = o(e, t) : s = C.isURLSearchParams(e) ? e.toString() : new yu(e, t).toString(r), s) {
    const i = n.indexOf("#");
    i !== -1 && (n = n.slice(0, i)), n += (n.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return n;
}
class Qie {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, t, r) {
    return this.handlers.push({
      fulfilled: e,
      rejected: t,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    C.forEach(this.handlers, function(r) {
      r !== null && e(r);
    });
  }
}
const mp = Qie, qg = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, eae = typeof URLSearchParams < "u" ? URLSearchParams : yu, tae = typeof FormData < "u" ? FormData : null, nae = typeof Blob < "u" ? Blob : null, rae = {
  isBrowser: !0,
  classes: {
    URLSearchParams: eae,
    FormData: tae,
    Blob: nae
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, bu = typeof window < "u" && typeof document < "u", rc = typeof navigator == "object" && navigator || void 0, oae = bu && (!rc || ["ReactNative", "NativeScript", "NS"].indexOf(rc.product) < 0), sae = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), iae = bu && window.location.href || "http://localhost", aae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: bu,
  hasStandardBrowserEnv: oae,
  hasStandardBrowserWebWorkerEnv: sae,
  navigator: rc,
  origin: iae
}, Symbol.toStringTag, { value: "Module" })), tt = {
  ...aae,
  ...rae
};
function lae(n, e) {
  return na(n, new tt.classes.URLSearchParams(), Object.assign({
    visitor: function(t, r, o, s) {
      return tt.isNode && C.isBuffer(t) ? (this.append(r, t.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function cae(n) {
  return C.matchAll(/\w+|\[(\w*)]/g, n).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function uae(n) {
  const e = {}, t = Object.keys(n);
  let r;
  const o = t.length;
  let s;
  for (r = 0; r < o; r++)
    s = t[r], e[s] = n[s];
  return e;
}
function zg(n) {
  function e(t, r, o, s) {
    let i = t[s++];
    if (i === "__proto__")
      return !0;
    const a = Number.isFinite(+i), l = s >= t.length;
    return i = !i && C.isArray(o) ? o.length : i, l ? (C.hasOwnProp(o, i) ? o[i] = [o[i], r] : o[i] = r, !a) : ((!o[i] || !C.isObject(o[i])) && (o[i] = []), e(t, r, o[i], s) && C.isArray(o[i]) && (o[i] = uae(o[i])), !a);
  }
  if (C.isFormData(n) && C.isFunction(n.entries)) {
    const t = {};
    return C.forEachEntry(n, (r, o) => {
      e(cae(r), o, t, 0);
    }), t;
  }
  return null;
}
function dae(n, e, t) {
  if (C.isString(n))
    try {
      return (e || JSON.parse)(n), C.trim(n);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (t || JSON.stringify)(n);
}
const vu = {
  transitional: qg,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, t) {
    const r = t.getContentType() || "", o = r.indexOf("application/json") > -1, s = C.isObject(e);
    if (s && C.isHTMLForm(e) && (e = new FormData(e)), C.isFormData(e))
      return o ? JSON.stringify(zg(e)) : e;
    if (C.isArrayBuffer(e) || C.isBuffer(e) || C.isStream(e) || C.isFile(e) || C.isBlob(e) || C.isReadableStream(e))
      return e;
    if (C.isArrayBufferView(e))
      return e.buffer;
    if (C.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let a;
    if (s) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return lae(e, this.formSerializer).toString();
      if ((a = C.isFileList(e)) || r.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return na(
          a ? { "files[]": e } : e,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return s || o ? (t.setContentType("application/json", !1), dae(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || vu.transitional, r = t && t.forcedJSONParsing, o = this.responseType === "json";
    if (C.isResponse(e) || C.isReadableStream(e))
      return e;
    if (e && C.isString(e) && (r && !this.responseType || o)) {
      const i = !(t && t.silentJSONParsing) && o;
      try {
        return JSON.parse(e);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? K.from(a, K.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: tt.classes.FormData,
    Blob: tt.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
C.forEach(["delete", "get", "head", "post", "put", "patch"], (n) => {
  vu.headers[n] = {};
});
const ku = vu, fae = C.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), pae = (n) => {
  const e = {};
  let t, r, o;
  return n && n.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), t = i.substring(0, o).trim().toLowerCase(), r = i.substring(o + 1).trim(), !(!t || e[t] && fae[t]) && (t === "set-cookie" ? e[t] ? e[t].push(r) : e[t] = [r] : e[t] = e[t] ? e[t] + ", " + r : r);
  }), e;
}, gp = Symbol("internals");
function ho(n) {
  return n && String(n).trim().toLowerCase();
}
function Bs(n) {
  return n === !1 || n == null ? n : C.isArray(n) ? n.map(Bs) : String(n);
}
function hae(n) {
  const e = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = t.exec(n); )
    e[r[1]] = r[2];
  return e;
}
const mae = (n) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());
function ll(n, e, t, r, o) {
  if (C.isFunction(r))
    return r.call(this, e, t);
  if (o && (e = t), !!C.isString(e)) {
    if (C.isString(r))
      return e.indexOf(r) !== -1;
    if (C.isRegExp(r))
      return r.test(e);
  }
}
function gae(n) {
  return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, r) => t.toUpperCase() + r);
}
function yae(n, e) {
  const t = C.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(n, r + t, {
      value: function(o, s, i) {
        return this[r].call(this, e, o, s, i);
      },
      configurable: !0
    });
  });
}
class ra {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, r) {
    const o = this;
    function s(a, l, c) {
      const u = ho(l);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const d = C.findKey(o, u);
      (!d || o[d] === void 0 || c === !0 || c === void 0 && o[d] !== !1) && (o[d || l] = Bs(a));
    }
    const i = (a, l) => C.forEach(a, (c, u) => s(c, u, l));
    if (C.isPlainObject(e) || e instanceof this.constructor)
      i(e, t);
    else if (C.isString(e) && (e = e.trim()) && !mae(e))
      i(pae(e), t);
    else if (C.isHeaders(e))
      for (const [a, l] of e.entries())
        s(l, a, r);
    else
      e != null && s(t, e, r);
    return this;
  }
  get(e, t) {
    if (e = ho(e), e) {
      const r = C.findKey(this, e);
      if (r) {
        const o = this[r];
        if (!t)
          return o;
        if (t === !0)
          return hae(o);
        if (C.isFunction(t))
          return t.call(this, o, r);
        if (C.isRegExp(t))
          return t.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = ho(e), e) {
      const r = C.findKey(this, e);
      return !!(r && this[r] !== void 0 && (!t || ll(this, this[r], r, t)));
    }
    return !1;
  }
  delete(e, t) {
    const r = this;
    let o = !1;
    function s(i) {
      if (i = ho(i), i) {
        const a = C.findKey(r, i);
        a && (!t || ll(r, r[a], a, t)) && (delete r[a], o = !0);
      }
    }
    return C.isArray(e) ? e.forEach(s) : s(e), o;
  }
  clear(e) {
    const t = Object.keys(this);
    let r = t.length, o = !1;
    for (; r--; ) {
      const s = t[r];
      (!e || ll(this, this[s], s, e, !0)) && (delete this[s], o = !0);
    }
    return o;
  }
  normalize(e) {
    const t = this, r = {};
    return C.forEach(this, (o, s) => {
      const i = C.findKey(r, s);
      if (i) {
        t[i] = Bs(o), delete t[s];
        return;
      }
      const a = e ? gae(s) : String(s).trim();
      a !== s && delete t[s], t[a] = Bs(o), r[a] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return C.forEach(this, (r, o) => {
      r != null && r !== !1 && (t[o] = e && C.isArray(r) ? r.join(", ") : r);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    const r = new this(e);
    return t.forEach((o) => r.set(o)), r;
  }
  static accessor(e) {
    const r = (this[gp] = this[gp] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function s(i) {
      const a = ho(i);
      r[a] || (yae(o, i), r[a] = !0);
    }
    return C.isArray(e) ? e.forEach(s) : s(e), this;
  }
}
ra.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
C.reduceDescriptors(ra.prototype, ({ value: n }, e) => {
  let t = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => n,
    set(r) {
      this[t] = r;
    }
  };
});
C.freezeMethods(ra);
const Ct = ra;
function cl(n, e) {
  const t = this || ku, r = e || t, o = Ct.from(r.headers);
  let s = r.data;
  return C.forEach(n, function(a) {
    s = a.call(t, s, o.normalize(), e ? e.status : void 0);
  }), o.normalize(), s;
}
function $g(n) {
  return !!(n && n.__CANCEL__);
}
function ro(n, e, t) {
  K.call(this, n ?? "canceled", K.ERR_CANCELED, e, t), this.name = "CanceledError";
}
C.inherits(ro, K, {
  __CANCEL__: !0
});
function Hg(n, e, t) {
  const r = t.config.validateStatus;
  !t.status || !r || r(t.status) ? n(t) : e(new K(
    "Request failed with status code " + t.status,
    [K.ERR_BAD_REQUEST, K.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
function bae(n) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(n);
  return e && e[1] || "";
}
function vae(n, e) {
  n = n || 10;
  const t = new Array(n), r = new Array(n);
  let o = 0, s = 0, i;
  return e = e !== void 0 ? e : 1e3, function(l) {
    const c = Date.now(), u = r[s];
    i || (i = c), t[o] = l, r[o] = c;
    let d = s, f = 0;
    for (; d !== o; )
      f += t[d++], d = d % n;
    if (o = (o + 1) % n, o === s && (s = (s + 1) % n), c - i < e)
      return;
    const p = u && c - u;
    return p ? Math.round(f * 1e3 / p) : void 0;
  };
}
function kae(n, e) {
  let t = 0, r = 1e3 / e, o, s;
  const i = (c, u = Date.now()) => {
    t = u, o = null, s && (clearTimeout(s), s = null), n.apply(null, c);
  };
  return [(...c) => {
    const u = Date.now(), d = u - t;
    d >= r ? i(c, u) : (o = c, s || (s = setTimeout(() => {
      s = null, i(o);
    }, r - d)));
  }, () => o && i(o)];
}
const wi = (n, e, t = 3) => {
  let r = 0;
  const o = vae(50, 250);
  return kae((s) => {
    const i = s.loaded, a = s.lengthComputable ? s.total : void 0, l = i - r, c = o(l), u = i <= a;
    r = i;
    const d = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: l,
      rate: c || void 0,
      estimated: c && a && u ? (a - i) / c : void 0,
      event: s,
      lengthComputable: a != null,
      [e ? "download" : "upload"]: !0
    };
    n(d);
  }, t);
}, yp = (n, e) => {
  const t = n != null;
  return [(r) => e[0]({
    lengthComputable: t,
    total: n,
    loaded: r
  }), e[1]];
}, bp = (n) => (...e) => C.asap(() => n(...e)), xae = tt.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const e = tt.navigator && /(msie|trident)/i.test(tt.navigator.userAgent), t = document.createElement("a");
    let r;
    function o(s) {
      let i = s;
      return e && (t.setAttribute("href", i), i = t.href), t.setAttribute("href", i), {
        href: t.href,
        protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
        host: t.host,
        search: t.search ? t.search.replace(/^\?/, "") : "",
        hash: t.hash ? t.hash.replace(/^#/, "") : "",
        hostname: t.hostname,
        port: t.port,
        pathname: t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname
      };
    }
    return r = o(window.location.href), function(i) {
      const a = C.isString(i) ? o(i) : i;
      return a.protocol === r.protocol && a.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
), wae = tt.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(n, e, t, r, o, s) {
      const i = [n + "=" + encodeURIComponent(e)];
      C.isNumber(t) && i.push("expires=" + new Date(t).toGMTString()), C.isString(r) && i.push("path=" + r), C.isString(o) && i.push("domain=" + o), s === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(n) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(n) {
      this.write(n, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Sae(n) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(n);
}
function Cae(n, e) {
  return e ? n.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : n;
}
function jg(n, e) {
  return n && !Sae(e) ? Cae(n, e) : e;
}
const vp = (n) => n instanceof Ct ? { ...n } : n;
function dr(n, e) {
  e = e || {};
  const t = {};
  function r(c, u, d) {
    return C.isPlainObject(c) && C.isPlainObject(u) ? C.merge.call({ caseless: d }, c, u) : C.isPlainObject(u) ? C.merge({}, u) : C.isArray(u) ? u.slice() : u;
  }
  function o(c, u, d) {
    if (C.isUndefined(u)) {
      if (!C.isUndefined(c))
        return r(void 0, c, d);
    } else
      return r(c, u, d);
  }
  function s(c, u) {
    if (!C.isUndefined(u))
      return r(void 0, u);
  }
  function i(c, u) {
    if (C.isUndefined(u)) {
      if (!C.isUndefined(c))
        return r(void 0, c);
    } else
      return r(void 0, u);
  }
  function a(c, u, d) {
    if (d in e)
      return r(c, u);
    if (d in n)
      return r(void 0, c);
  }
  const l = {
    url: s,
    method: s,
    data: s,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (c, u) => o(vp(c), vp(u), !0)
  };
  return C.forEach(Object.keys(Object.assign({}, n, e)), function(u) {
    const d = l[u] || o, f = d(n[u], e[u], u);
    C.isUndefined(f) && d !== a || (t[u] = f);
  }), t;
}
const Vg = (n) => {
  const e = dr({}, n);
  let { data: t, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: s, headers: i, auth: a } = e;
  e.headers = i = Ct.from(i), e.url = Fg(jg(e.baseURL, e.url), n.params, n.paramsSerializer), a && i.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let l;
  if (C.isFormData(t)) {
    if (tt.hasStandardBrowserEnv || tt.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((l = i.getContentType()) !== !1) {
      const [c, ...u] = l ? l.split(";").map((d) => d.trim()).filter(Boolean) : [];
      i.setContentType([c || "multipart/form-data", ...u].join("; "));
    }
  }
  if (tt.hasStandardBrowserEnv && (r && C.isFunction(r) && (r = r(e)), r || r !== !1 && xae(e.url))) {
    const c = o && s && wae.read(s);
    c && i.set(o, c);
  }
  return e;
}, Eae = typeof XMLHttpRequest < "u", Aae = Eae && function(n) {
  return new Promise(function(t, r) {
    const o = Vg(n);
    let s = o.data;
    const i = Ct.from(o.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: c } = o, u, d, f, p, h;
    function m() {
      p && p(), h && h(), o.cancelToken && o.cancelToken.unsubscribe(u), o.signal && o.signal.removeEventListener("abort", u);
    }
    let g = new XMLHttpRequest();
    g.open(o.method.toUpperCase(), o.url, !0), g.timeout = o.timeout;
    function b() {
      if (!g)
        return;
      const x = Ct.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), w = {
        data: !a || a === "text" || a === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: x,
        config: n,
        request: g
      };
      Hg(function(S) {
        t(S), m();
      }, function(S) {
        r(S), m();
      }, w), g = null;
    }
    "onloadend" in g ? g.onloadend = b : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(b);
    }, g.onabort = function() {
      g && (r(new K("Request aborted", K.ECONNABORTED, n, g)), g = null);
    }, g.onerror = function() {
      r(new K("Network Error", K.ERR_NETWORK, n, g)), g = null;
    }, g.ontimeout = function() {
      let y = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const w = o.transitional || qg;
      o.timeoutErrorMessage && (y = o.timeoutErrorMessage), r(new K(
        y,
        w.clarifyTimeoutError ? K.ETIMEDOUT : K.ECONNABORTED,
        n,
        g
      )), g = null;
    }, s === void 0 && i.setContentType(null), "setRequestHeader" in g && C.forEach(i.toJSON(), function(y, w) {
      g.setRequestHeader(w, y);
    }), C.isUndefined(o.withCredentials) || (g.withCredentials = !!o.withCredentials), a && a !== "json" && (g.responseType = o.responseType), c && ([f, h] = wi(c, !0), g.addEventListener("progress", f)), l && g.upload && ([d, p] = wi(l), g.upload.addEventListener("progress", d), g.upload.addEventListener("loadend", p)), (o.cancelToken || o.signal) && (u = (x) => {
      g && (r(!x || x.type ? new ro(null, n, g) : x), g.abort(), g = null);
    }, o.cancelToken && o.cancelToken.subscribe(u), o.signal && (o.signal.aborted ? u() : o.signal.addEventListener("abort", u)));
    const v = bae(o.url);
    if (v && tt.protocols.indexOf(v) === -1) {
      r(new K("Unsupported protocol " + v + ":", K.ERR_BAD_REQUEST, n));
      return;
    }
    g.send(s || null);
  });
}, Tae = (n, e) => {
  const { length: t } = n = n ? n.filter(Boolean) : [];
  if (e || t) {
    let r = new AbortController(), o;
    const s = function(c) {
      if (!o) {
        o = !0, a();
        const u = c instanceof Error ? c : this.reason;
        r.abort(u instanceof K ? u : new ro(u instanceof Error ? u.message : u));
      }
    };
    let i = e && setTimeout(() => {
      i = null, s(new K(`timeout ${e} of ms exceeded`, K.ETIMEDOUT));
    }, e);
    const a = () => {
      n && (i && clearTimeout(i), i = null, n.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(s) : c.removeEventListener("abort", s);
      }), n = null);
    };
    n.forEach((c) => c.addEventListener("abort", s));
    const { signal: l } = r;
    return l.unsubscribe = () => C.asap(a), l;
  }
}, Oae = Tae, Mae = function* (n, e) {
  let t = n.byteLength;
  if (!e || t < e) {
    yield n;
    return;
  }
  let r = 0, o;
  for (; r < t; )
    o = r + e, yield n.slice(r, o), r = o;
}, Dae = async function* (n, e) {
  for await (const t of _ae(n))
    yield* Mae(t, e);
}, _ae = async function* (n) {
  if (n[Symbol.asyncIterator]) {
    yield* n;
    return;
  }
  const e = n.getReader();
  try {
    for (; ; ) {
      const { done: t, value: r } = await e.read();
      if (t)
        break;
      yield r;
    }
  } finally {
    await e.cancel();
  }
}, kp = (n, e, t, r) => {
  const o = Dae(n, e);
  let s = 0, i, a = (l) => {
    i || (i = !0, r && r(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: c, value: u } = await o.next();
        if (c) {
          a(), l.close();
          return;
        }
        let d = u.byteLength;
        if (t) {
          let f = s += d;
          t(f);
        }
        l.enqueue(new Uint8Array(u));
      } catch (c) {
        throw a(c), c;
      }
    },
    cancel(l) {
      return a(l), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, oa = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Ug = oa && typeof ReadableStream == "function", Nae = oa && (typeof TextEncoder == "function" ? ((n) => (e) => n.encode(e))(new TextEncoder()) : async (n) => new Uint8Array(await new Response(n).arrayBuffer())), Wg = (n, ...e) => {
  try {
    return !!n(...e);
  } catch {
    return !1;
  }
}, Rae = Ug && Wg(() => {
  let n = !1;
  const e = new Request(tt.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return n = !0, "half";
    }
  }).headers.has("Content-Type");
  return n && !e;
}), xp = 64 * 1024, oc = Ug && Wg(() => C.isReadableStream(new Response("").body)), Si = {
  stream: oc && ((n) => n.body)
};
oa && ((n) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !Si[e] && (Si[e] = C.isFunction(n[e]) ? (t) => t[e]() : (t, r) => {
      throw new K(`Response type '${e}' is not supported`, K.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const Lae = async (n) => {
  if (n == null)
    return 0;
  if (C.isBlob(n))
    return n.size;
  if (C.isSpecCompliantForm(n))
    return (await new Request(tt.origin, {
      method: "POST",
      body: n
    }).arrayBuffer()).byteLength;
  if (C.isArrayBufferView(n) || C.isArrayBuffer(n))
    return n.byteLength;
  if (C.isURLSearchParams(n) && (n = n + ""), C.isString(n))
    return (await Nae(n)).byteLength;
}, Pae = async (n, e) => {
  const t = C.toFiniteNumber(n.getContentLength());
  return t ?? Lae(e);
}, Iae = oa && (async (n) => {
  let {
    url: e,
    method: t,
    data: r,
    signal: o,
    cancelToken: s,
    timeout: i,
    onDownloadProgress: a,
    onUploadProgress: l,
    responseType: c,
    headers: u,
    withCredentials: d = "same-origin",
    fetchOptions: f
  } = Vg(n);
  c = c ? (c + "").toLowerCase() : "text";
  let p = Oae([o, s && s.toAbortSignal()], i), h;
  const m = p && p.unsubscribe && (() => {
    p.unsubscribe();
  });
  let g;
  try {
    if (l && Rae && t !== "get" && t !== "head" && (g = await Pae(u, r)) !== 0) {
      let w = new Request(e, {
        method: "POST",
        body: r,
        duplex: "half"
      }), k;
      if (C.isFormData(r) && (k = w.headers.get("content-type")) && u.setContentType(k), w.body) {
        const [S, E] = yp(
          g,
          wi(bp(l))
        );
        r = kp(w.body, xp, S, E);
      }
    }
    C.isString(d) || (d = d ? "include" : "omit");
    const b = "credentials" in Request.prototype;
    h = new Request(e, {
      ...f,
      signal: p,
      method: t.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: b ? d : void 0
    });
    let v = await fetch(h);
    const x = oc && (c === "stream" || c === "response");
    if (oc && (a || x && m)) {
      const w = {};
      ["status", "statusText", "headers"].forEach((T) => {
        w[T] = v[T];
      });
      const k = C.toFiniteNumber(v.headers.get("content-length")), [S, E] = a && yp(
        k,
        wi(bp(a), !0)
      ) || [];
      v = new Response(
        kp(v.body, xp, S, () => {
          E && E(), m && m();
        }),
        w
      );
    }
    c = c || "text";
    let y = await Si[C.findKey(Si, c) || "text"](v, n);
    return !x && m && m(), await new Promise((w, k) => {
      Hg(w, k, {
        data: y,
        headers: Ct.from(v.headers),
        status: v.status,
        statusText: v.statusText,
        config: n,
        request: h
      });
    });
  } catch (b) {
    throw m && m(), b && b.name === "TypeError" && /fetch/i.test(b.message) ? Object.assign(
      new K("Network Error", K.ERR_NETWORK, n, h),
      {
        cause: b.cause || b
      }
    ) : K.from(b, b && b.code, n, h);
  }
}), sc = {
  http: Gie,
  xhr: Aae,
  fetch: Iae
};
C.forEach(sc, (n, e) => {
  if (n) {
    try {
      Object.defineProperty(n, "name", { value: e });
    } catch {
    }
    Object.defineProperty(n, "adapterName", { value: e });
  }
});
const wp = (n) => `- ${n}`, Bae = (n) => C.isFunction(n) || n === null || n === !1, Kg = {
  getAdapter: (n) => {
    n = C.isArray(n) ? n : [n];
    const { length: e } = n;
    let t, r;
    const o = {};
    for (let s = 0; s < e; s++) {
      t = n[s];
      let i;
      if (r = t, !Bae(t) && (r = sc[(i = String(t)).toLowerCase()], r === void 0))
        throw new K(`Unknown adapter '${i}'`);
      if (r)
        break;
      o[i || "#" + s] = r;
    }
    if (!r) {
      const s = Object.entries(o).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = e ? s.length > 1 ? `since :
` + s.map(wp).join(`
`) : " " + wp(s[0]) : "as no adapter specified";
      throw new K(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: sc
};
function ul(n) {
  if (n.cancelToken && n.cancelToken.throwIfRequested(), n.signal && n.signal.aborted)
    throw new ro(null, n);
}
function Sp(n) {
  return ul(n), n.headers = Ct.from(n.headers), n.data = cl.call(
    n,
    n.transformRequest
  ), ["post", "put", "patch"].indexOf(n.method) !== -1 && n.headers.setContentType("application/x-www-form-urlencoded", !1), Kg.getAdapter(n.adapter || ku.adapter)(n).then(function(r) {
    return ul(n), r.data = cl.call(
      n,
      n.transformResponse,
      r
    ), r.headers = Ct.from(r.headers), r;
  }, function(r) {
    return $g(r) || (ul(n), r && r.response && (r.response.data = cl.call(
      n,
      n.transformResponse,
      r.response
    ), r.response.headers = Ct.from(r.response.headers))), Promise.reject(r);
  });
}
const Jg = "1.7.7", xu = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((n, e) => {
  xu[n] = function(r) {
    return typeof r === n || "a" + (e < 1 ? "n " : " ") + n;
  };
});
const Cp = {};
xu.transitional = function(e, t, r) {
  function o(s, i) {
    return "[Axios v" + Jg + "] Transitional option '" + s + "'" + i + (r ? ". " + r : "");
  }
  return (s, i, a) => {
    if (e === !1)
      throw new K(
        o(i, " has been removed" + (t ? " in " + t : "")),
        K.ERR_DEPRECATED
      );
    return t && !Cp[i] && (Cp[i] = !0, console.warn(
      o(
        i,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(s, i, a) : !0;
  };
};
function Fae(n, e, t) {
  if (typeof n != "object")
    throw new K("options must be an object", K.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(n);
  let o = r.length;
  for (; o-- > 0; ) {
    const s = r[o], i = e[s];
    if (i) {
      const a = n[s], l = a === void 0 || i(a, s, n);
      if (l !== !0)
        throw new K("option " + s + " must be " + l, K.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new K("Unknown option " + s, K.ERR_BAD_OPTION);
  }
}
const ic = {
  assertOptions: Fae,
  validators: xu
}, cn = ic.validators;
class Ci {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new mp(),
      response: new mp()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(e, t) {
    try {
      return await this._request(e, t);
    } catch (r) {
      if (r instanceof Error) {
        let o;
        Error.captureStackTrace ? Error.captureStackTrace(o = {}) : o = new Error();
        const s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? s && !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + s) : r.stack = s;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = dr(this.defaults, t);
    const { transitional: r, paramsSerializer: o, headers: s } = t;
    r !== void 0 && ic.assertOptions(r, {
      silentJSONParsing: cn.transitional(cn.boolean),
      forcedJSONParsing: cn.transitional(cn.boolean),
      clarifyTimeoutError: cn.transitional(cn.boolean)
    }, !1), o != null && (C.isFunction(o) ? t.paramsSerializer = {
      serialize: o
    } : ic.assertOptions(o, {
      encode: cn.function,
      serialize: cn.function
    }, !0)), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let i = s && C.merge(
      s.common,
      s[t.method]
    );
    s && C.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete s[h];
      }
    ), t.headers = Ct.concat(i, s);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(m) {
      typeof m.runWhen == "function" && m.runWhen(t) === !1 || (l = l && m.synchronous, a.unshift(m.fulfilled, m.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(m) {
      c.push(m.fulfilled, m.rejected);
    });
    let u, d = 0, f;
    if (!l) {
      const h = [Sp.bind(this), void 0];
      for (h.unshift.apply(h, a), h.push.apply(h, c), f = h.length, u = Promise.resolve(t); d < f; )
        u = u.then(h[d++], h[d++]);
      return u;
    }
    f = a.length;
    let p = t;
    for (d = 0; d < f; ) {
      const h = a[d++], m = a[d++];
      try {
        p = h(p);
      } catch (g) {
        m.call(this, g);
        break;
      }
    }
    try {
      u = Sp.call(this, p);
    } catch (h) {
      return Promise.reject(h);
    }
    for (d = 0, f = c.length; d < f; )
      u = u.then(c[d++], c[d++]);
    return u;
  }
  getUri(e) {
    e = dr(this.defaults, e);
    const t = jg(e.baseURL, e.url);
    return Fg(t, e.params, e.paramsSerializer);
  }
}
C.forEach(["delete", "get", "head", "options"], function(e) {
  Ci.prototype[e] = function(t, r) {
    return this.request(dr(r || {}, {
      method: e,
      url: t,
      data: (r || {}).data
    }));
  };
});
C.forEach(["post", "put", "patch"], function(e) {
  function t(r) {
    return function(s, i, a) {
      return this.request(dr(a || {}, {
        method: e,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: i
      }));
    };
  }
  Ci.prototype[e] = t(), Ci.prototype[e + "Form"] = t(!0);
});
const Fs = Ci;
class wu {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(s) {
      t = s;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners)
        return;
      let s = r._listeners.length;
      for (; s-- > 0; )
        r._listeners[s](o);
      r._listeners = null;
    }), this.promise.then = (o) => {
      let s;
      const i = new Promise((a) => {
        r.subscribe(a), s = a;
      }).then(o);
      return i.cancel = function() {
        r.unsubscribe(s);
      }, i;
    }, e(function(s, i, a) {
      r.reason || (r.reason = new ro(s, i, a), t(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), t = (r) => {
      e.abort(r);
    };
    return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new wu(function(o) {
        e = o;
      }),
      cancel: e
    };
  }
}
const qae = wu;
function zae(n) {
  return function(t) {
    return n.apply(null, t);
  };
}
function $ae(n) {
  return C.isObject(n) && n.isAxiosError === !0;
}
const ac = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(ac).forEach(([n, e]) => {
  ac[e] = n;
});
const Hae = ac;
function Gg(n) {
  const e = new Fs(n), t = Ag(Fs.prototype.request, e);
  return C.extend(t, Fs.prototype, e, { allOwnKeys: !0 }), C.extend(t, e, null, { allOwnKeys: !0 }), t.create = function(o) {
    return Gg(dr(n, o));
  }, t;
}
const xe = Gg(ku);
xe.Axios = Fs;
xe.CanceledError = ro;
xe.CancelToken = qae;
xe.isCancel = $g;
xe.VERSION = Jg;
xe.toFormData = na;
xe.AxiosError = K;
xe.Cancel = xe.CanceledError;
xe.all = function(e) {
  return Promise.all(e);
};
xe.spread = zae;
xe.isAxiosError = $ae;
xe.mergeConfig = dr;
xe.AxiosHeaders = Ct;
xe.formToJSON = (n) => zg(C.isHTMLForm(n) ? new FormData(n) : n);
xe.getAdapter = Kg.getAdapter;
xe.HttpStatusCode = Hae;
xe.default = xe;
const jae = xe, Zg = async (n, e, t = "/openai/completion") => {
  try {
    const r = await jae.post(t, {
      prompt: n
    }, e);
    if (r.data.success)
      return r.data.completion;
    throw new Error("Failed to complete prompt");
  } catch (r) {
    console.log(r);
  }
}, Vae = ["onClick"], Uae = { class: "flex items-center justify-center w-10 h-10 bg-white border rounded-md border-stone-200" }, Wae = { class: "font-medium" }, Kae = { class: "text-xs text-stone-500" }, Jae = /* @__PURE__ */ fe({
  __name: "slashCommandList",
  props: {
    items: {
      type: Array,
      required: !0
    },
    command: {
      type: Function,
      required: !0
    },
    editor: {
      type: Object,
      required: !0
    },
    range: {
      type: Object,
      required: !0
    }
  },
  setup(n, { expose: e }) {
    const t = n, r = H(0), { isLoading: o, setCompletion: s } = Dm({
      id: "novel-vue",
      api: ft("completionApi"),
      headers: ft("apiHeaders"),
      onResponse: (f) => {
        t.editor.chain().focus().deleteRange(t.range).run();
      },
      onFinish: (f, p) => {
        t.editor.commands.setTextSelection({
          from: t.range.from,
          to: t.range.from + p.length
        });
      },
      onError: (f) => {
        console.error(f);
      }
    }), i = H(), a = ["ArrowUp", "ArrowDown", "Enter"];
    function l(f) {
      if (a.includes(f.key))
        return f.preventDefault(), f.key === "ArrowUp" ? (r.value = (r.value + t.items.length - 1) % t.items.length, d(), !0) : f.key === "ArrowDown" ? (r.value = (r.value + 1) % t.items.length, d(), !0) : f.key === "Enter" ? (c(r.value), !0) : !1;
    }
    Xn(
      () => t.items,
      () => {
        r.value = 0;
      }
    ), e({
      onKeyDown: l
    });
    function c(f) {
      const p = t.items[f], h = ft("apiHeaders"), m = ft("completionApi");
      if (p)
        if (p.title === "Continue writing") {
          if (o.value)
            return;
          o.value = !0, Zg(ec(t.editor, {
            chars: 5e3,
            offset: 1
          }), {
            ...h
          }, m).then((g) => {
            s(g), t.editor.chain().focus().deleteRange(t.range).run(), o.value = !1, t.editor.commands.setTextSelection({
              from: t.range.from,
              to: t.range.from + g.length
            });
          });
        } else
          t.command(p);
    }
    function u(f, p) {
      const h = f.offsetHeight, m = p ? p.offsetHeight : 0, g = p.offsetTop, b = g + m;
      g < f.scrollTop ? f.scrollTop -= f.scrollTop - g + 5 : b > h + f.scrollTop && (f.scrollTop += b - h - f.scrollTop + 5);
    }
    function d() {
      const f = i.value, p = f == null ? void 0 : f.children[r.value];
      f && p && u(f, p);
    }
    return (f, p) => n.items.length > 0 ? (V(), re("div", {
      key: 0,
      ref_key: "commandListContainer",
      ref: i,
      class: "z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
    }, [
      (V(!0), re(je, null, tr(n.items, (h, m) => (V(), re("button", {
        class: er(["flex items-center w-full px-2 py-1 space-x-2 text-sm text-left rounded-md text-stone-900 hover:bg-stone-100", m === r.value ? "bg-stone-100 text-stone-900" : ""]),
        key: m,
        onClick: (g) => c(m)
      }, [
        J("div", Uae, [
          h.title === "Continue writing" && ue(o) ? (V(), Te(cie, { key: 0 })) : (V(), Te(Mi(h.icon), {
            key: 1,
            size: "18"
          }))
        ]),
        J("div", null, [
          J("p", Wae, xt(h.title), 1),
          J("p", Kae, xt(h.description), 1)
        ])
      ], 10, Vae))), 128))
    ], 512)) : Ge("", !0);
  }
});
var Gae = Object.defineProperty, Zae = (n, e, t) => e in n ? Gae(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, qe = (n, e, t) => (Zae(n, typeof e != "symbol" ? e + "" : e, t), t);
let lc = 1;
class Yae {
  constructor() {
    qe(this, "subscribers"), qe(this, "toasts"), qe(this, "subscribe", (e) => (this.subscribers.push(e), () => {
      const t = this.subscribers.indexOf(e);
      this.subscribers.splice(t, 1);
    })), qe(this, "publish", (e) => {
      this.subscribers.forEach((t) => t(e));
    }), qe(this, "addToast", (e) => {
      this.publish(e), this.toasts = [...this.toasts, e];
    }), qe(this, "create", (e) => {
      var t;
      const { message: r, ...o } = e, s = typeof (e == null ? void 0 : e.id) == "number" || ((t = e.id) == null ? void 0 : t.length) > 0 ? e.id : lc++, i = this.toasts.findIndex((l) => l.id === s), a = e.dismissible === void 0 ? !0 : e.dismissible;
      return i !== -1 ? this.toasts = this.toasts.map((l) => l.id === s ? (this.publish({ ...l, ...e, id: s, title: r }), {
        ...l,
        ...e,
        id: s,
        dismissible: a,
        title: r
      }) : l) : this.addToast({ title: r, ...o, dismissible: a, id: s }), s;
    }), qe(this, "dismiss", (e) => (e || this.toasts.forEach((t) => {
      this.subscribers.forEach(
        (r) => r({ id: t.id, dismiss: !0 })
      );
    }), this.subscribers.forEach((t) => t({ id: e, dismiss: !0 })), e)), qe(this, "message", (e, t) => this.create({ ...t, message: e })), qe(this, "error", (e, t) => this.create({ ...t, type: "error", message: e })), qe(this, "success", (e, t) => this.create({ ...t, type: "success", message: e })), qe(this, "info", (e, t) => this.create({ ...t, type: "info", message: e })), qe(this, "warning", (e, t) => this.create({ ...t, type: "warning", message: e })), qe(this, "loading", (e, t) => this.create({ ...t, type: "loading", message: e })), qe(this, "promise", (e, t) => {
      if (!t)
        return;
      let r;
      t.loading !== void 0 && (r = this.create({
        ...t,
        promise: e,
        type: "loading",
        message: t.loading
      }));
      const o = e instanceof Promise ? e : e();
      let s = r !== void 0;
      return o.then((i) => {
        if (t.success !== void 0) {
          s = !1;
          const a = typeof t.success == "function" ? t.success(i) : t.success;
          this.create({ id: r, type: "success", message: a });
        }
      }).catch((i) => {
        if (t.error !== void 0) {
          s = !1;
          const a = typeof t.error == "function" ? t.error(i) : t.error;
          this.create({ id: r, type: "error", message: a });
        }
      }).finally(() => {
        var i;
        s && (this.dismiss(r), r = void 0), (i = t.finally) == null || i.call(t);
      }), r;
    }), qe(this, "custom", (e, t) => {
      const r = (t == null ? void 0 : t.id) || lc++;
      return this.publish({ ...t, id: r, title: e }), r;
    }), this.subscribers = [], this.toasts = [];
  }
}
const vt = new Yae(), Xae = (n, e) => {
  const t = (e == null ? void 0 : e.id) || lc++;
  return vt.publish({
    title: n,
    ...e,
    id: t
  }), t;
}, Qae = Xae, cc = Object.assign(Qae, {
  success: vt.success,
  info: vt.info,
  warning: vt.warning,
  error: vt.error,
  custom: vt.custom,
  message: vt.message,
  promise: vt.promise,
  dismiss: vt.dismiss,
  loading: vt.loading
}), ele = ["data-visible"], tle = { className: "sonner-spinner" }, nle = /* @__PURE__ */ fe({
  __name: "Loader",
  props: {
    visible: Boolean
  },
  setup(n) {
    const e = Array(12).fill(0);
    return (t, r) => (V(), re("div", {
      className: "sonner-loading-wrapper",
      "data-visible": n.visible
    }, [
      J("div", tle, [
        (V(!0), re(je, null, tr(ue(e), (o) => (V(), re("div", {
          key: `spinner-bar-${o}`,
          className: "sonner-loading-bar"
        }))), 128))
      ])
    ], 8, ele));
  }
}), ts = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, o] of e)
    t[r] = o;
  return t;
}, rle = {}, ole = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, sle = /* @__PURE__ */ J("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  "clip-rule": "evenodd"
}, null, -1), ile = [
  sle
];
function ale(n, e) {
  return V(), re("svg", ole, ile);
}
const lle = /* @__PURE__ */ ts(rle, [["render", ale]]), cle = {}, ule = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, dle = /* @__PURE__ */ J("path", {
  "fill-rule": "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  "clip-rule": "evenodd"
}, null, -1), fle = [
  dle
];
function ple(n, e) {
  return V(), re("svg", ule, fle);
}
const hle = /* @__PURE__ */ ts(cle, [["render", ple]]), mle = {}, gle = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, yle = /* @__PURE__ */ J("path", {
  "fill-rule": "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  "clip-rule": "evenodd"
}, null, -1), ble = [
  yle
];
function vle(n, e) {
  return V(), re("svg", gle, ble);
}
const kle = /* @__PURE__ */ ts(mle, [["render", vle]]), xle = {}, wle = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, Sle = /* @__PURE__ */ J("path", {
  "fill-rule": "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  "clip-rule": "evenodd"
}, null, -1), Cle = [
  Sle
];
function Ele(n, e) {
  return V(), re("svg", wle, Cle);
}
const Ale = /* @__PURE__ */ ts(xle, [["render", Ele]]), Tle = {}, Ole = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stoke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Mle = /* @__PURE__ */ J("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}, null, -1), Dle = /* @__PURE__ */ J("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}, null, -1), _le = [
  Mle,
  Dle
];
function Nle(n, e) {
  return V(), re("svg", Ole, _le);
}
const Rle = /* @__PURE__ */ ts(Tle, [["render", Nle]]), Lle = ["aria-live", "data-styled", "data-mounted", "data-promise", "data-removed", "data-visible", "data-y-position", "data-x-position", "data-index", "data-front", "data-swiping", "data-type", "data-invert", "data-swipe-out", "data-expanded"], Ple = ["data-disabled"], Ile = {
  key: 1,
  "data-icon": ""
}, Ble = { "data-content": "" }, Fle = { "data-title": "" }, qle = 4e3, zle = 14, $le = 20, Hle = 200, jle = /* @__PURE__ */ fe({
  __name: "Toast",
  props: {
    toast: {
      type: Object,
      required: !0
    },
    toasts: {
      type: Array,
      required: !0
    },
    index: {
      type: Number,
      required: !0
    },
    expanded: {
      type: Boolean,
      required: !0
    },
    invert: {
      type: Boolean,
      required: !0
    },
    heights: {
      type: Array,
      required: !0
    },
    position: {
      type: String,
      required: !0
    },
    visibleToasts: {
      type: Number,
      required: !0
    },
    expandByDefault: {
      type: Boolean,
      required: !0
    },
    closeButton: {
      type: Boolean,
      required: !0
    },
    interacting: {
      type: Boolean,
      required: !0
    },
    duration: {
      type: Number,
      required: !1
    },
    descriptionClass: {
      type: String,
      required: !1
    }
  },
  emits: ["update:heights", "removeToast"],
  setup(n, { emit: e }) {
    const t = n, r = (Z) => !!Z.promise, o = H(!1), s = H(!1), i = H(!1), a = H(!1), l = H(null), c = H(0), u = H(0), d = H(null), f = H(null), p = le(() => t.index === 0), h = le(() => t.index + 1 <= t.visibleToasts), m = le(() => t.toast.type), g = le(() => t.toast.dismissible), b = t.toast.className || "", v = t.toast.descriptionClassName || "", x = t.toast.style || {}, y = le(
      () => t.heights.findIndex((Z) => Z.toastId === t.toast.id) || 0
    ), w = le(
      () => t.toast.duration || t.duration || qle
    ), k = H(0), S = H(0), E = H(w.value), T = H(0), D = H(null), N = le(() => t.position.split("-")), z = le(() => t.heights.reduce((Z, Q, ae) => ae >= y.value ? Z : Z + Q.height, 0)), I = le(() => t.toast.invert || t.invert), O = le(() => l.value === "loading"), F = le(
      () => l.value ?? (t.toast.type || null)
    ), L = le(() => !r(t.toast) && typeof t.toast.title == "object"), $ = le(() => {
      if (!r(t.toast))
        return null;
      switch (l.value) {
        case "loading":
          return t.toast.loading;
        case "success":
          return typeof t.toast.success == "function" ? d.value : t.toast.success;
        case "error":
          return typeof t.toast.error == "function" ? d.value : t.toast.error;
        default:
          return null;
      }
    });
    Et(() => o.value = !0), He(() => {
      S.value = y.value * zle + z.value;
    });
    function ee() {
      var Z, Q;
      (!O.value || g.value) && (ne(), (Q = (Z = t.toast).onDismiss) == null || Q.call(Z, t.toast));
    }
    function ne() {
      s.value = !0, c.value = S.value;
      const Z = t.heights.filter(
        (Q) => Q.toastId !== t.toast.id
      );
      e("update:heights", Z), setTimeout(() => {
        e("removeToast", t.toast);
      }, Hle);
    }
    const ve = (Z) => {
      O || (c.value = S.value, Z.target.setPointerCapture(Z.pointerId), Z.target.tagName !== "BUTTON" && (i.value = !0, D.value = Z.clientY));
    }, Ce = (Z) => {
      var Q, ae, Ee, Ke;
      if (a.value)
        return;
      const Je = Number(
        ((Q = f.value) == null ? void 0 : Q.style.getPropertyValue("--swipe-amount").replace("px", "")) || 0
      );
      if (Math.abs(Je) >= $le) {
        c.value = S.value, (Ee = (ae = t.toast).onDismiss) == null || Ee.call(ae, t.toast), ne(), a.value = !0;
        return;
      }
      (Ke = f.value) == null || Ke.style.setProperty("--swipe-amount", "0px"), D.value = null, i.value = !0;
    }, _e = (Z) => {
      var Q, ae;
      if (!D.value)
        return;
      const Ee = Z.clientY - D.value;
      if (!(N.value[0] === "top" ? Ee < 0 : Ee > 0)) {
        (Q = f.value) == null || Q.style.setProperty("--swipe-amount", "0px");
        return;
      }
      (ae = f.value) == null || ae.style.setProperty("--swipe-amount", `${Ee}px`);
    };
    return He((Z) => {
      if (t.toast.promise && l.value === "loading" || t.toast.duration === 1 / 0)
        return;
      let Q;
      const ae = () => {
        if (T.value < k.value) {
          const Ke = (/* @__PURE__ */ new Date()).getTime() - k.value;
          E.value = E.value - Ke;
        }
        T.value = (/* @__PURE__ */ new Date()).getTime();
      }, Ee = () => {
        k.value = (/* @__PURE__ */ new Date()).getTime(), Q = setTimeout(() => {
          var Ke, Je;
          (Je = (Ke = t.toast).onAutoClose) == null || Je.call(Ke, t.toast), ne();
        }, E.value);
      };
      t.expanded || t.interacting ? ae() : Ee(), Z(() => {
        clearTimeout(Q);
      });
    }), Et(() => {
      if (f.value) {
        const Z = f.value.getBoundingClientRect().height;
        u.value = Z;
        const Q = [{ toastId: t.toast.id, height: Z }, ...t.heights];
        e("update:heights", Q);
      }
    }), Qn(() => {
      if (f.value) {
        const Z = t.heights.filter(
          (Q) => Q.toastId !== t.toast.id
        );
        e("update:heights", Z);
      }
    }), He(() => {
      t.toast.delete && ne();
    }), (Z, Q) => (V(), re("li", {
      "aria-live": n.toast.important ? "assertive" : "polite",
      "aria-atomic": "",
      role: "status",
      tabindex: "0",
      ref_key: "toastRef",
      ref: f,
      "data-sonner-toast": "",
      class: er(ue(b)),
      "data-styled": !L.value,
      "data-mounted": o.value,
      "data-promise": !!n.toast.promise,
      "data-removed": s.value,
      "data-visible": h.value,
      "data-y-position": N.value[0],
      "data-x-position": N.value[1],
      "data-index": t.index,
      "data-front": p.value,
      "data-swiping": i.value,
      "data-type": l.value !== "loading" && l.value ? l.value : m.value,
      "data-invert": I.value,
      "data-swipe-out": a.value,
      "data-expanded": !!(t.expanded || t.expandByDefault && o.value),
      style: Rr({
        "--index": t.index,
        "--toasts-before": t.index,
        "--z-index": n.toasts.length - t.index,
        "--offset": `${s.value ? c.value : S.value}px`,
        "--initial-height": t.expandByDefault ? "auto" : `${u.value}px`,
        ...ue(x)
      }),
      onPointerdown: ve,
      onPointerup: Ce,
      onPointermove: _e
    }, [
      t.closeButton && !L.value ? (V(), re("button", {
        key: 0,
        "aria-label": "Close toast",
        "data-close-button": "",
        "data-disabled": O.value,
        onClick: ee
      }, [
        Ye(Rle)
      ], 8, Ple)) : Ge("", !0),
      m.value || n.toast.icon || n.toast.promise ? (V(), re("div", Ile, [
        typeof n.toast.promise == "function" || m.value === "loading" ? (V(), Te(nle, {
          key: 0,
          visible: l.value === "loading" || m.value === "loading"
        }, null, 8, ["visible"])) : Ge("", !0),
        F.value === "success" ? (V(), Te(lle, { key: 1 })) : F.value === "info" ? (V(), Te(hle, { key: 2 })) : F.value === "warning" ? (V(), Te(kle, { key: 3 })) : F.value === "error" ? (V(), Te(Ale, { key: 4 })) : Ge("", !0)
      ])) : Ge("", !0),
      J("div", Ble, [
        J("div", Fle, [
          typeof n.toast.title == "string" ? (V(), re(je, { key: 0 }, [
            Au(xt(n.toast.title), 1)
          ], 64)) : n.toast.title === void 0 || n.toast.title === null ? (V(), re(je, { key: 1 }, [
            Au(xt($.value), 1)
          ], 64)) : L.value ? (V(), Te(Mi(n.toast.title), {
            key: 2,
            onCloseToast: Q[0] || (Q[0] = () => {
              var ae;
              ne(), (ae = n.toast.cancel) != null && ae.onClick && n.toast.cancel.onClick();
            })
          }, null, 32)) : Ge("", !0)
        ]),
        n.toast.description ? (V(), re("div", {
          key: 0,
          "data-description": "",
          class: er(n.descriptionClass + ue(v))
        }, xt(n.toast.description), 3)) : Ge("", !0)
      ]),
      n.toast.cancel ? (V(), re("button", {
        key: 2,
        "data-button": "",
        "data-cancel": "",
        onClick: Q[1] || (Q[1] = () => {
          var ae;
          ne(), (ae = n.toast.cancel) != null && ae.onClick && n.toast.cancel.onClick();
        })
      }, xt(n.toast.cancel.label), 1)) : Ge("", !0),
      n.toast.action ? (V(), re("button", {
        key: 3,
        "data-button": "",
        onClick: Q[2] || (Q[2] = () => {
          var ae;
          ne(), (ae = n.toast.action) == null || ae.onClick();
        })
      }, xt(n.toast.action.label), 1)) : Ge("", !0)
    ], 46, Lle));
  }
}), Vle = ["aria-label"], Ule = ["dir", "data-theme", "data-rich-colors", "data-y-position", "data-x-position"], Wle = 3, Ep = "32px", Kle = 4e3, Jle = 356, Ap = 14, Gle = /* @__PURE__ */ fe({
  name: "Toaster",
  inheritAttrs: !1,
  __name: "Toaster",
  props: {
    invert: { type: Boolean, default: !1 },
    theme: { default: "light" },
    position: { default: "bottom-right" },
    hotkey: { default: () => ["altKey", "KeyT"] },
    richColors: { type: Boolean, default: !1 },
    expand: { type: Boolean, default: !1 },
    duration: { default: Kle },
    gap: { default: Ap },
    visibleToasts: { default: Wle },
    closeButton: { type: Boolean, default: !1 },
    toastOptions: { default: () => ({}) },
    className: { default: "" },
    style: { default: () => ({}) },
    offset: { default: Ep },
    dir: { default: "auto" }
  },
  setup(n) {
    const e = n, t = C0(), r = H([]), o = H([]), s = H(!1), i = H(!1), a = H(
      e.theme !== "system" ? e.theme : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    ), l = le(() => e.position.split("-")), c = H(null), u = e.hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    function d(p) {
      r.value = r.value.filter(({ id: h }) => h !== p.id);
    }
    function f() {
      if (typeof window > "u")
        return "ltr";
      const p = document.documentElement.getAttribute("dir");
      return p === "auto" || !p ? window.getComputedStyle(document.documentElement).direction : p;
    }
    return Et(() => {
      const p = vt.subscribe((h) => {
        if (h.dismiss) {
          r.value = r.value.map(
            (m) => m.id === h.id ? { ...m, delete: !0 } : m
          );
          return;
        }
        fc(() => {
          const m = r.value.findIndex((g) => g.id === h.id);
          m !== -1 ? r.value.splice(m, 1, h) : r.value = [h, ...r.value];
        });
      });
      Qn(() => {
        p();
      });
    }), Xn(
      () => e.theme,
      (p) => {
        if (p !== "system") {
          a.value = p;
          return;
        }
        p === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? a.value = "dark" : a.value = "light"), !(typeof window > "u") && window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches: h }) => {
          h ? a.value = "dark" : a.value = "light";
        });
      }
    ), He(() => {
      r.value.length <= 1 && (s.value = !1);
    }), He((p) => {
      function h(m) {
        var g, b;
        e.hotkey.every(
          (v) => m[v] || m.code === v
        ) && (s.value = !0, (g = c.value) == null || g.focus()), m.code === "Escape" && (document.activeElement === c.value || (b = c.value) != null && b.contains(document.activeElement)) && (s.value = !1);
      }
      document.addEventListener("keydown", h), p(() => {
        document.removeEventListener("keydown", h);
      });
    }), (p, h) => {
      var m;
      return V(), re("section", {
        "aria-label": `Notifications ${ue(u)}`,
        tabIndex: -1
      }, [
        J("ol", {
          ref_key: "listRef",
          ref: c,
          "data-sonner-toaster": "",
          dir: p.dir === "auto" ? f() : p.dir,
          tabIndex: -1,
          "data-theme": p.theme,
          "data-rich-colors": p.richColors,
          "data-y-position": l.value[0],
          "data-x-position": l.value[1],
          style: Rr(
            {
              "--front-toast-height": `${(m = o.value[0]) == null ? void 0 : m.height}px`,
              "--offset": typeof p.offset == "number" ? `${p.offset}px` : p.offset || Ep,
              "--width": `${Jle}px`,
              "--gap": `${Ap}px`,
              ...ue(t).style
            }
          ),
          onMouseenter: h[1] || (h[1] = (g) => s.value = !0),
          onMousemove: h[2] || (h[2] = (g) => s.value = !0),
          onMouseleave: h[3] || (h[3] = () => {
            i.value || (s.value = !1);
          }),
          onPointerdown: h[4] || (h[4] = (g) => i.value = !1),
          onPointerup: h[5] || (h[5] = (g) => i.value = !1)
        }, [
          (V(!0), re(je, null, tr(r.value, (g, b) => {
            var v, x, y, w;
            return V(), Te(jle, {
              key: g.id,
              index: b,
              toast: g,
              duration: ((v = p.toastOptions) == null ? void 0 : v.duration) ?? p.duration,
              className: (x = p.toastOptions) == null ? void 0 : x.className,
              descriptionClassName: (y = p.toastOptions) == null ? void 0 : y.descriptionClassName,
              invert: p.invert,
              visibleToasts: p.visibleToasts,
              closeButton: p.closeButton,
              interacting: i.value,
              position: p.position,
              style: Rr((w = p.toastOptions) == null ? void 0 : w.style),
              toasts: r.value,
              expandByDefault: p.expand,
              gap: p.gap,
              expanded: s.value,
              heights: o.value,
              "onUpdate:heights": h[0] || (h[0] = (k) => o.value = k),
              onRemoveToast: d
            }, null, 8, ["index", "toast", "duration", "className", "descriptionClassName", "invert", "visibleToasts", "closeButton", "interacting", "position", "style", "toasts", "expandByDefault", "gap", "expanded", "heights"]);
          }), 128))
        ], 44, Ule)
      ], 8, Vle);
    };
  }
}), Ei = new Pe("upload-image"), Zle = () => new be({
  key: Ei,
  state: {
    init() {
      return me.empty;
    },
    apply(n, e) {
      e = e.map(n.mapping, n.doc);
      const t = n.getMeta(this);
      if (t && t.add) {
        const { id: r, pos: o, src: s } = t.add, i = document.createElement("div");
        i.setAttribute("class", "img-placeholder");
        const a = document.createElement("img");
        a.setAttribute(
          "class",
          "opacity-40 rounded-lg border border-stone-200"
        ), a.src = s, i.appendChild(a);
        const l = $e.widget(o + 1, i, {
          id: r
        });
        e = e.add(n.doc, [l]);
      } else
        t && t.remove && (e = e.remove(
          e.find(void 0, void 0, (r) => r.id == t.remove.id)
        ));
      return e;
    }
  },
  props: {
    decorations(n) {
      return this.getState(n);
    }
  }
});
function Yle(n, e) {
  const r = Ei.getState(n).find(null, null, (o) => o.id == e);
  return r.length ? r[0].from : null;
}
function Xle(n, e, t) {
  if (n.type.includes("image/")) {
    if (n.size / 1024 / 1024 > 20) {
      cc.error("File size too big (max 20MB).");
      return;
    }
  } else {
    cc.error("File type not supported.");
    return;
  }
  const r = {}, o = e.state.tr;
  o.selection.empty || o.deleteSelection();
  const s = new FileReader();
  s.readAsDataURL(n), s.onload = () => {
    o.setMeta(Ei, {
      add: {
        id: r,
        pos: t,
        src: s.result
      }
    }), e.dispatch(o);
  }, Qle(n).then((i) => {
    const { schema: a } = e.state;
    let l = Yle(e.state, r);
    if (l == null)
      return;
    const c = typeof i == "object" ? s.result : i, u = a.nodes.image.create({ src: c }), d = e.state.tr.replaceWith(l, l, u).setMeta(Ei, { remove: { id: r } });
    e.dispatch(d);
  });
}
const Qle = (n) => new Promise((e) => {
  cc.promise(
    fetch(ql("blobApi", "/api/upload").value, {
      method: "POST",
      headers: {
        "content-type": (n == null ? void 0 : n.type) || "application/octet-stream",
        "x-vercel-filename": encodeURIComponent((n == null ? void 0 : n.name) || "image.png")
      },
      body: n
    }).then(async (t) => {
      if (t.status === 200) {
        const { url: r } = await t.json();
        let o = new Image();
        o.src = r, o.onload = () => {
          e(r);
        };
      } else
        throw t.status === 401 ? (e(n), new Error(
          "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead."
        )) : new Error("Error uploading image. Please try again.");
    }),
    {
      loading: "Uploading image...",
      success: () => "Image uploaded successfully.",
      error: () => "Image uploaded failed."
    }
  );
}), ece = ye.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor: n,
          range: e,
          props: t
        }) => {
          t.command({ editor: n, range: e });
        }
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      Gse({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
}), tce = ({ query: n }) => [
  {
    title: "Continue writing",
    description: "Use AI to expand your thoughts.",
    searchTerms: ["gpt"],
    icon: nie
  },
  {
    title: "Send Feedback",
    description: "Let us know how we can improve.",
    icon: tie,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).run(), window.open("/feedback", "_blank");
    }
  },
  {
    title: "Text",
    description: "Just start typing with plain text.",
    searchTerms: ["p", "paragraph"],
    icon: Eg,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).toggleNode("paragraph", "paragraph").run();
    }
  },
  {
    title: "To-do List",
    description: "Track tasks with a to-do list.",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: vg,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).toggleTaskList().run();
    }
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    searchTerms: ["title", "big", "large"],
    icon: xg,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).setNode("heading", { level: 1 }).run();
    }
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    searchTerms: ["subtitle", "medium"],
    icon: wg,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).setNode("heading", { level: 2 }).run();
    }
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    searchTerms: ["subtitle", "small"],
    icon: Sg,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).setNode("heading", { level: 3 }).run();
    }
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    searchTerms: ["unordered", "point"],
    icon: eie,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).toggleBulletList().run();
    }
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    searchTerms: ["ordered"],
    icon: Ql,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).toggleOrderedList().run();
    }
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    searchTerms: ["blockquote"],
    icon: Cg,
    command: ({ editor: e, range: t }) => e.chain().focus().deleteRange(t).toggleNode("paragraph", "paragraph").toggleBlockquote().run()
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    searchTerms: ["codeblock"],
    icon: mu,
    command: ({ editor: e, range: t }) => e.chain().focus().deleteRange(t).toggleCodeBlock().run()
  },
  {
    title: "Image",
    description: "Upload an image from your computer.",
    searchTerms: ["photo", "picture", "media"],
    icon: Xse,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).run();
      const r = document.createElement("input");
      r.type = "file", r.accept = "image/*", r.onchange = async () => {
        var o;
        if ((o = r.files) != null && o.length) {
          const s = r.files[0], i = e.view.state.selection.from;
          Xle(s, e.view, i);
        }
      }, r.click();
    }
  }
].filter((e) => {
  if (typeof n == "string" && n.length > 0) {
    const t = n.toLowerCase();
    return e.title.toLowerCase().includes(t) || e.description.toLowerCase().includes(t) || e.searchTerms && e.searchTerms.some((r) => r.includes(t));
  }
  return !0;
}), nce = () => {
  let n = null, e = null;
  return {
    onStart: (t) => {
      n = new nw(Jae, {
        props: t,
        editor: t.editor
      }), t.clientRect && (e = pr("body", {
        getReferenceClientRect: t.clientRect,
        appendTo: () => document.body,
        content: n.element,
        showOnCreate: !0,
        interactive: !0,
        trigger: "manual",
        placement: "bottom-start"
      }));
    },
    onUpdate: (t) => {
      n == null || n.updateProps(t), e && e[0].setProps({
        getReferenceClientRect: t.clientRect
      });
    },
    onKeyDown: (t) => {
      var r;
      return t.event.key === "Escape" ? (e == null || e[0].hide(), !0) : (r = n == null ? void 0 : n.ref) == null ? void 0 : r.onKeyDown(t.event);
    },
    onExit: () => {
      e == null || e[0].destroy(), n == null || n.destroy();
    }
  };
}, rce = ece.configure({
  suggestion: {
    items: tce,
    render: nce
  }
}), oce = $m.extend({
  addAttributes() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      width: {
        default: null
      },
      height: {
        default: null
      }
    };
  }
}), sce = [
  MS.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 -mt-2"
      }
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 -mt-2"
      }
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2"
      }
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700"
      }
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800"
      }
    },
    code: {
      HTMLAttributes: {
        class: "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900",
        spellcheck: "false"
      }
    },
    horizontalRule: !1,
    dropcursor: {
      color: "#DBEAFE",
      width: 4
    },
    gapcursor: !1
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  Pm.extend({
    addInputRules() {
      return [
        new Jo({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state: n, range: e }) => {
            const t = {}, { tr: r } = n, o = e.from;
            let s = e.to;
            r.insert(o - 1, this.type.create(t)).delete(
              r.mapping.map(o),
              r.mapping.map(s)
            );
          }
        })
      ];
    }
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-stone-300"
    }
  }),
  XS.configure({
    HTMLAttributes: {
      class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
    }
  }),
  $m.extend({
    addProseMirrorPlugins() {
      return [Zle()];
    }
  }).configure({
    allowBase64: !0,
    HTMLAttributes: {
      class: "rounded-lg border border-stone-200"
    }
  }),
  oce.configure({
    HTMLAttributes: {
      class: "rounded-lg border border-stone-200"
    }
  }),
  eC.configure({
    placeholder: ({ node: n }) => n.type.name === "heading" ? `Heading ${n.attrs.level}` : "Press '/' for commands, or '++' for AI autocomplete...",
    includeChildren: !0
  }),
  tC,
  nC,
  rC,
  Wse.configure({
    multicolor: !0
  }),
  iC.configure({
    HTMLAttributes: {
      class: "not-prose pl-2"
    }
  }),
  sC.configure({
    HTMLAttributes: {
      class: "flex items-start my-4"
    },
    nested: !0
  }),
  jse.configure({
    html: !1,
    transformCopiedText: !0
  }),
  rce
], ice = {
  attributes: {
    class: "prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
  },
  handleDOMEvents: {
    keydown: (n, e) => {
      if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key) && document.querySelector("#slash-command"))
        return !0;
    }
  }
};
function rn(n, e, ...t) {
  if (n in e) {
    let o = e[n];
    return typeof o == "function" ? o(...t) : o;
  }
  let r = new Error(`Tried to handle "${n}" but there is no handler defined. Only defined handlers are: ${Object.keys(e).map((o) => `"${o}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, rn), r;
}
var Uo = ((n) => (n[n.None = 0] = "None", n[n.RenderStrategy = 1] = "RenderStrategy", n[n.Static = 2] = "Static", n))(Uo || {}), ace = ((n) => (n[n.Unmount = 0] = "Unmount", n[n.Hidden = 1] = "Hidden", n))(ace || {});
function on({ visible: n = !0, features: e = 0, ourProps: t, theirProps: r, ...o }) {
  var s;
  let i = Xg(r, t), a = Object.assign(o, { props: i });
  if (n || e & 2 && i.static)
    return dl(a);
  if (e & 1) {
    let l = (s = i.unmount) == null || s ? 0 : 1;
    return rn(l, { 0() {
      return null;
    }, 1() {
      return dl({ ...o, props: { ...i, hidden: !0, style: { display: "none" } } });
    } });
  }
  return dl(a);
}
function dl({ props: n, attrs: e, slots: t, slot: r, name: o }) {
  var s, i;
  let { as: a, ...l } = lce(n, ["unmount", "static"]), c = (s = t.default) == null ? void 0 : s.call(t, r), u = {};
  if (r) {
    let d = !1, f = [];
    for (let [p, h] of Object.entries(r))
      typeof h == "boolean" && (d = !0), h === !0 && f.push(p);
    d && (u["data-headlessui-state"] = f.join(" "));
  }
  if (a === "template") {
    if (c = Yg(c ?? []), Object.keys(l).length > 0 || Object.keys(e).length > 0) {
      let [d, ...f] = c ?? [];
      if (!cce(d) || f.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${o} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(l).concat(Object.keys(e)).map((m) => m.trim()).filter((m, g, b) => b.indexOf(m) === g).sort((m, g) => m.localeCompare(g)).map((m) => `  - ${m}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((m) => `  - ${m}`).join(`
`)].join(`
`));
      let p = Xg((i = d.props) != null ? i : {}, l), h = E0(d, p);
      for (let m in p)
        m.startsWith("on") && (h.props || (h.props = {}), h.props[m] = p[m]);
      return h;
    }
    return Array.isArray(c) && c.length === 1 ? c[0] : c;
  }
  return he(a, Object.assign({}, l, u), { default: () => c });
}
function Yg(n) {
  return n.flatMap((e) => e.type === je ? Yg(e.children) : [e]);
}
function Xg(...n) {
  if (n.length === 0)
    return {};
  if (n.length === 1)
    return n[0];
  let e = {}, t = {};
  for (let r of n)
    for (let o in r)
      o.startsWith("on") && typeof r[o] == "function" ? (t[o] != null || (t[o] = []), t[o].push(r[o])) : e[o] = r[o];
  if (e.disabled || e["aria-disabled"])
    return Object.assign(e, Object.fromEntries(Object.keys(t).map((r) => [r, void 0])));
  for (let r in t)
    Object.assign(e, { [r](o, ...s) {
      let i = t[r];
      for (let a of i) {
        if (o instanceof Event && o.defaultPrevented)
          return;
        a(o, ...s);
      }
    } });
  return e;
}
function lce(n, e = []) {
  let t = Object.assign({}, n);
  for (let r of e)
    r in t && delete t[r];
  return t;
}
function cce(n) {
  return n == null ? !1 : typeof n.type == "string" || typeof n.type == "object" || typeof n.type == "function";
}
let uce = 0;
function dce() {
  return ++uce;
}
function qr() {
  return dce();
}
var hn = ((n) => (n.Space = " ", n.Enter = "Enter", n.Escape = "Escape", n.Backspace = "Backspace", n.Delete = "Delete", n.ArrowLeft = "ArrowLeft", n.ArrowUp = "ArrowUp", n.ArrowRight = "ArrowRight", n.ArrowDown = "ArrowDown", n.Home = "Home", n.End = "End", n.PageUp = "PageUp", n.PageDown = "PageDown", n.Tab = "Tab", n))(hn || {});
function W(n) {
  var e;
  return n == null || n.value == null ? null : (e = n.value.$el) != null ? e : n.value;
}
let Qg = Symbol("Context");
var fr = ((n) => (n[n.Open = 1] = "Open", n[n.Closed = 2] = "Closed", n[n.Closing = 4] = "Closing", n[n.Opening = 8] = "Opening", n))(fr || {});
function e0() {
  return ft(Qg, null);
}
function fce(n) {
  tn(Qg, n);
}
function Tp(n, e) {
  if (n)
    return n;
  let t = e ?? "button";
  if (typeof t == "string" && t.toLowerCase() === "button")
    return "button";
}
function pce(n, e) {
  let t = H(Tp(n.value.type, n.value.as));
  return Et(() => {
    t.value = Tp(n.value.type, n.value.as);
  }), He(() => {
    var r;
    t.value || W(e) && W(e) instanceof HTMLButtonElement && !((r = W(e)) != null && r.hasAttribute("type")) && (t.value = "button");
  }), t;
}
var hce = Object.defineProperty, mce = (n, e, t) => e in n ? hce(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Op = (n, e, t) => (mce(n, typeof e != "symbol" ? e + "" : e, t), t);
class gce {
  constructor() {
    Op(this, "current", this.detect()), Op(this, "currentId", 0);
  }
  set(e) {
    this.current !== e && (this.currentId = 0, this.current = e);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
}
let sa = new gce();
function Mn(n) {
  if (sa.isServer)
    return null;
  if (n instanceof Node)
    return n.ownerDocument;
  if (n != null && n.hasOwnProperty("value")) {
    let e = W(n);
    if (e)
      return e.ownerDocument;
  }
  return document;
}
let uc = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((n) => `${n}:not([tabindex='-1'])`).join(",");
var Xt = ((n) => (n[n.First = 1] = "First", n[n.Previous = 2] = "Previous", n[n.Next = 4] = "Next", n[n.Last = 8] = "Last", n[n.WrapAround = 16] = "WrapAround", n[n.NoScroll = 32] = "NoScroll", n))(Xt || {}), Ai = ((n) => (n[n.Error = 0] = "Error", n[n.Overflow = 1] = "Overflow", n[n.Success = 2] = "Success", n[n.Underflow = 3] = "Underflow", n))(Ai || {}), yce = ((n) => (n[n.Previous = -1] = "Previous", n[n.Next = 1] = "Next", n))(yce || {});
function ia(n = document.body) {
  return n == null ? [] : Array.from(n.querySelectorAll(uc)).sort((e, t) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Su = ((n) => (n[n.Strict = 0] = "Strict", n[n.Loose = 1] = "Loose", n))(Su || {});
function t0(n, e = 0) {
  var t;
  return n === ((t = Mn(n)) == null ? void 0 : t.body) ? !1 : rn(e, { 0() {
    return n.matches(uc);
  }, 1() {
    let r = n;
    for (; r !== null; ) {
      if (r.matches(uc))
        return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var bce = ((n) => (n[n.Keyboard = 0] = "Keyboard", n[n.Mouse = 1] = "Mouse", n))(bce || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (n) => {
  n.metaKey || n.altKey || n.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (n) => {
  n.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : n.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
let vce = ["textarea", "input"].join(",");
function kce(n) {
  var e, t;
  return (t = (e = n == null ? void 0 : n.matches) == null ? void 0 : e.call(n, vce)) != null ? t : !1;
}
function xce(n, e = (t) => t) {
  return n.slice().sort((t, r) => {
    let o = e(t), s = e(r);
    if (o === null || s === null)
      return 0;
    let i = o.compareDocumentPosition(s);
    return i & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : i & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Vn(n, e, { sorted: t = !0, relativeTo: r = null, skipElements: o = [] } = {}) {
  var s;
  let i = (s = Array.isArray(n) ? n.length > 0 ? n[0].ownerDocument : document : n == null ? void 0 : n.ownerDocument) != null ? s : document, a = Array.isArray(n) ? t ? xce(n) : n : ia(n);
  o.length > 0 && a.length > 1 && (a = a.filter((h) => !o.includes(h))), r = r ?? i.activeElement;
  let l = (() => {
    if (e & 5)
      return 1;
    if (e & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), c = (() => {
    if (e & 1)
      return 0;
    if (e & 2)
      return Math.max(0, a.indexOf(r)) - 1;
    if (e & 4)
      return Math.max(0, a.indexOf(r)) + 1;
    if (e & 8)
      return a.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = e & 32 ? { preventScroll: !0 } : {}, d = 0, f = a.length, p;
  do {
    if (d >= f || d + f <= 0)
      return 0;
    let h = c + d;
    if (e & 16)
      h = (h + f) % f;
    else {
      if (h < 0)
        return 3;
      if (h >= f)
        return 1;
    }
    p = a[h], p == null || p.focus(u), d += l;
  } while (p !== i.activeElement);
  return e & 6 && kce(p) && p.select(), 2;
}
function Ms(n, e, t) {
  sa.isServer || He((r) => {
    document.addEventListener(n, e, t), r(() => document.removeEventListener(n, e, t));
  });
}
function n0(n, e, t) {
  sa.isServer || He((r) => {
    window.addEventListener(n, e, t), r(() => window.removeEventListener(n, e, t));
  });
}
function wce(n, e, t = le(() => !0)) {
  function r(s, i) {
    if (!t.value || s.defaultPrevented)
      return;
    let a = i(s);
    if (a === null || !a.getRootNode().contains(a))
      return;
    let l = function c(u) {
      return typeof u == "function" ? c(u()) : Array.isArray(u) || u instanceof Set ? u : [u];
    }(n);
    for (let c of l) {
      if (c === null)
        continue;
      let u = c instanceof HTMLElement ? c : W(c);
      if (u != null && u.contains(a) || s.composed && s.composedPath().includes(u))
        return;
    }
    return !t0(a, Su.Loose) && a.tabIndex !== -1 && s.preventDefault(), e(s, a);
  }
  let o = H(null);
  Ms("pointerdown", (s) => {
    var i, a;
    t.value && (o.value = ((a = (i = s.composedPath) == null ? void 0 : i.call(s)) == null ? void 0 : a[0]) || s.target);
  }, !0), Ms("mousedown", (s) => {
    var i, a;
    t.value && (o.value = ((a = (i = s.composedPath) == null ? void 0 : i.call(s)) == null ? void 0 : a[0]) || s.target);
  }, !0), Ms("click", (s) => {
    o.value && (r(s, () => o.value), o.value = null);
  }, !0), Ms("touchend", (s) => r(s, () => s.target instanceof HTMLElement ? s.target : null), !0), n0("blur", (s) => r(s, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
var Yr = ((n) => (n[n.None = 1] = "None", n[n.Focusable = 2] = "Focusable", n[n.Hidden = 4] = "Hidden", n))(Yr || {});
let Wo = fe({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(n, { slots: e, attrs: t }) {
  return () => {
    let { features: r, ...o } = n, s = { "aria-hidden": (r & 2) === 2 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
    return on({ ourProps: s, theirProps: o, slot: {}, attrs: t, slots: e, name: "Hidden" });
  };
} });
var Qt = ((n) => (n[n.Forwards = 0] = "Forwards", n[n.Backwards = 1] = "Backwards", n))(Qt || {});
function r0() {
  let n = H(0);
  return n0("keydown", (e) => {
    e.key === "Tab" && (n.value = e.shiftKey ? 1 : 0);
  }), n;
}
function Sce(n, e, t, r) {
  sa.isServer || He((o) => {
    n = n ?? window, n.addEventListener(e, t, r), o(() => n.removeEventListener(e, t, r));
  });
}
let o0 = Symbol("ForcePortalRootContext");
function Cce() {
  return ft(o0, !1);
}
fe({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: !1 } }, setup(n, { slots: e, attrs: t }) {
  return tn(o0, n.force), () => {
    let { force: r, ...o } = n;
    return on({ theirProps: o, ourProps: {}, slot: {}, slots: e, attrs: t, name: "ForcePortalRoot" });
  };
} });
function Ece(n) {
  let e = Mn(n);
  if (!e) {
    if (n === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${n}`);
  }
  let t = e.getElementById("headlessui-portal-root");
  if (t)
    return t;
  let r = e.createElement("div");
  return r.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(r);
}
fe({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(n, { slots: e, attrs: t }) {
  let r = H(null), o = le(() => Mn(r)), s = Cce(), i = ft(s0, null), a = H(s === !0 || i == null ? Ece(r.value) : i.resolveTarget());
  He(() => {
    s || i != null && (a.value = i.resolveTarget());
  });
  let l = ft(dc, null);
  return Et(() => {
    let c = W(r);
    c && l && Qn(l.register(c));
  }), Qn(() => {
    var c, u;
    let d = (c = o.value) == null ? void 0 : c.getElementById("headlessui-portal-root");
    d && a.value === d && a.value.children.length <= 0 && ((u = a.value.parentElement) == null || u.removeChild(a.value));
  }), () => {
    if (a.value === null)
      return null;
    let c = { ref: r, "data-headlessui-portal": "" };
    return he(Dp, { to: a.value }, on({ ourProps: c, theirProps: n, slot: {}, attrs: t, slots: e, name: "Portal" }));
  };
} });
let dc = Symbol("PortalParentContext");
function Ace() {
  let n = ft(dc, null), e = H([]);
  function t(s) {
    return e.value.push(s), n && n.register(s), () => r(s);
  }
  function r(s) {
    let i = e.value.indexOf(s);
    i !== -1 && e.value.splice(i, 1), n && n.unregister(s);
  }
  let o = { register: t, unregister: r, portals: e };
  return [e, fe({ name: "PortalWrapper", setup(s, { slots: i }) {
    return tn(dc, o), () => {
      var a;
      return (a = i.default) == null ? void 0 : a.call(i);
    };
  } })];
}
let s0 = Symbol("PortalGroupContext");
fe({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(n, { attrs: e, slots: t }) {
  let r = Oi({ resolveTarget() {
    return n.target;
  } });
  return tn(s0, r), () => {
    let { target: o, ...s } = n;
    return on({ theirProps: s, ourProps: {}, slot: {}, attrs: e, slots: t, name: "PortalGroup" });
  };
} });
function Tce({ defaultContainers: n = [], portals: e, mainTreeNodeRef: t } = {}) {
  let r = H(null), o = Mn(r);
  function s() {
    var i;
    let a = [];
    for (let l of n)
      l !== null && (l instanceof HTMLElement ? a.push(l) : "value" in l && l.value instanceof HTMLElement && a.push(l.value));
    if (e != null && e.value)
      for (let l of e.value)
        a.push(l);
    for (let l of (i = o == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null ? i : [])
      l !== document.body && l !== document.head && l instanceof HTMLElement && l.id !== "headlessui-portal-root" && (l.contains(W(r)) || a.some((c) => l.contains(c)) || a.push(l));
    return a;
  }
  return { resolveContainers: s, contains(i) {
    return s().some((a) => a.contains(i));
  }, mainTreeNodeRef: r, MainTreeNode() {
    return t != null ? null : he(Wo, { features: Yr.Hidden, ref: r });
  } };
}
function Oce() {
  let n = H(null);
  return { mainTreeNodeRef: n, MainTreeNode() {
    return he(Wo, { features: Yr.Hidden, ref: n });
  } };
}
var Mce = ((n) => (n[n.Open = 0] = "Open", n[n.Closed = 1] = "Closed", n))(Mce || {});
let i0 = Symbol("PopoverContext");
function aa(n) {
  let e = ft(i0, null);
  if (e === null) {
    let t = new Error(`<${n} /> is missing a parent <${Cu.name} /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, aa), t;
  }
  return e;
}
let a0 = Symbol("PopoverGroupContext");
function l0() {
  return ft(a0, null);
}
let c0 = Symbol("PopoverPanelContext");
function Dce() {
  return ft(c0, null);
}
let Cu = fe({ name: "Popover", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" } }, setup(n, { slots: e, attrs: t, expose: r }) {
  var o;
  let s = H(null);
  r({ el: s, $el: s });
  let i = H(1), a = H(null), l = H(null), c = H(null), u = H(null), d = le(() => Mn(s)), f = le(() => {
    var w, k;
    if (!W(a) || !W(u))
      return !1;
    for (let I of document.querySelectorAll("body > *"))
      if (Number(I == null ? void 0 : I.contains(W(a))) ^ Number(I == null ? void 0 : I.contains(W(u))))
        return !0;
    let S = ia(), E = S.indexOf(W(a)), T = (E + S.length - 1) % S.length, D = (E + 1) % S.length, N = S[T], z = S[D];
    return !((w = W(u)) != null && w.contains(N)) && !((k = W(u)) != null && k.contains(z));
  }), p = { popoverState: i, buttonId: H(null), panelId: H(null), panel: u, button: a, isPortalled: f, beforePanelSentinel: l, afterPanelSentinel: c, togglePopover() {
    i.value = rn(i.value, { 0: 1, 1: 0 });
  }, closePopover() {
    i.value !== 1 && (i.value = 1);
  }, close(w) {
    p.closePopover();
    let k = (() => w ? w instanceof HTMLElement ? w : w.value instanceof HTMLElement ? W(w) : W(p.button) : W(p.button))();
    k == null || k.focus();
  } };
  tn(i0, p), fce(le(() => rn(i.value, { 0: fr.Open, 1: fr.Closed })));
  let h = { buttonId: p.buttonId, panelId: p.panelId, close() {
    p.closePopover();
  } }, m = l0(), g = m == null ? void 0 : m.registerPopover, [b, v] = Ace(), x = Tce({ mainTreeNodeRef: m == null ? void 0 : m.mainTreeNodeRef, portals: b, defaultContainers: [a, u] });
  function y() {
    var w, k, S, E;
    return (E = m == null ? void 0 : m.isFocusWithinPopoverGroup()) != null ? E : ((w = d.value) == null ? void 0 : w.activeElement) && (((k = W(a)) == null ? void 0 : k.contains(d.value.activeElement)) || ((S = W(u)) == null ? void 0 : S.contains(d.value.activeElement)));
  }
  return He(() => g == null ? void 0 : g(h)), Sce((o = d.value) == null ? void 0 : o.defaultView, "focus", (w) => {
    var k, S;
    w.target !== window && w.target instanceof HTMLElement && i.value === 0 && (y() || a && u && (x.contains(w.target) || (k = W(p.beforePanelSentinel)) != null && k.contains(w.target) || (S = W(p.afterPanelSentinel)) != null && S.contains(w.target) || p.closePopover()));
  }, !0), wce(x.resolveContainers, (w, k) => {
    var S;
    p.closePopover(), t0(k, Su.Loose) || (w.preventDefault(), (S = W(a)) == null || S.focus());
  }, le(() => i.value === 0)), () => {
    let w = { open: i.value === 0, close: p.close };
    return he(je, [he(v, {}, () => on({ theirProps: { ...n, ...t }, ourProps: { ref: s }, slot: w, slots: e, attrs: t, name: "Popover" })), he(x.MainTreeNode)]);
  };
} }), u0 = fe({ name: "PopoverButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: !1 }, id: { type: String, default: () => `headlessui-popover-button-${qr()}` } }, inheritAttrs: !1, setup(n, { attrs: e, slots: t, expose: r }) {
  let o = aa("PopoverButton"), s = le(() => Mn(o.button));
  r({ el: o.button, $el: o.button }), Et(() => {
    o.buttonId.value = n.id;
  }), Qn(() => {
    o.buttonId.value = null;
  });
  let i = l0(), a = i == null ? void 0 : i.closeOthers, l = Dce(), c = le(() => l === null ? !1 : l.value === o.panelId.value), u = H(null), d = `headlessui-focus-sentinel-${qr()}`;
  c.value || He(() => {
    o.button.value = u.value;
  });
  let f = pce(le(() => ({ as: n.as, type: e.type })), u);
  function p(x) {
    var y, w, k, S, E;
    if (c.value) {
      if (o.popoverState.value === 1)
        return;
      switch (x.key) {
        case hn.Space:
        case hn.Enter:
          x.preventDefault(), (w = (y = x.target).click) == null || w.call(y), o.closePopover(), (k = W(o.button)) == null || k.focus();
          break;
      }
    } else
      switch (x.key) {
        case hn.Space:
        case hn.Enter:
          x.preventDefault(), x.stopPropagation(), o.popoverState.value === 1 && (a == null || a(o.buttonId.value)), o.togglePopover();
          break;
        case hn.Escape:
          if (o.popoverState.value !== 0)
            return a == null ? void 0 : a(o.buttonId.value);
          if (!W(o.button) || (S = s.value) != null && S.activeElement && !((E = W(o.button)) != null && E.contains(s.value.activeElement)))
            return;
          x.preventDefault(), x.stopPropagation(), o.closePopover();
          break;
      }
  }
  function h(x) {
    c.value || x.key === hn.Space && x.preventDefault();
  }
  function m(x) {
    var y, w;
    n.disabled || (c.value ? (o.closePopover(), (y = W(o.button)) == null || y.focus()) : (x.preventDefault(), x.stopPropagation(), o.popoverState.value === 1 && (a == null || a(o.buttonId.value)), o.togglePopover(), (w = W(o.button)) == null || w.focus()));
  }
  function g(x) {
    x.preventDefault(), x.stopPropagation();
  }
  let b = r0();
  function v() {
    let x = W(o.panel);
    if (!x)
      return;
    function y() {
      rn(b.value, { [Qt.Forwards]: () => Vn(x, Xt.First), [Qt.Backwards]: () => Vn(x, Xt.Last) }) === Ai.Error && Vn(ia().filter((w) => w.dataset.headlessuiFocusGuard !== "true"), rn(b.value, { [Qt.Forwards]: Xt.Next, [Qt.Backwards]: Xt.Previous }), { relativeTo: W(o.button) });
    }
    y();
  }
  return () => {
    let x = o.popoverState.value === 0, y = { open: x }, { id: w, ...k } = n, S = c.value ? { ref: u, type: f.value, onKeydown: p, onClick: m } : { ref: u, id: w, type: f.value, "aria-expanded": o.popoverState.value === 0, "aria-controls": W(o.panel) ? o.panelId.value : void 0, disabled: n.disabled ? !0 : void 0, onKeydown: p, onKeyup: h, onClick: m, onMousedown: g };
    return he(je, [on({ ourProps: S, theirProps: { ...e, ...k }, slot: y, attrs: e, slots: t, name: "PopoverButton" }), x && !c.value && o.isPortalled.value && he(Wo, { id: d, features: Yr.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: v })]);
  };
} });
fe({ name: "PopoverOverlay", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 } }, setup(n, { attrs: e, slots: t }) {
  let r = aa("PopoverOverlay"), o = `headlessui-popover-overlay-${qr()}`, s = e0(), i = le(() => s !== null ? (s.value & fr.Open) === fr.Open : r.popoverState.value === 0);
  function a() {
    r.closePopover();
  }
  return () => {
    let l = { open: r.popoverState.value === 0 };
    return on({ ourProps: { id: o, "aria-hidden": !0, onClick: a }, theirProps: n, slot: l, attrs: e, slots: t, features: Uo.RenderStrategy | Uo.Static, visible: i.value, name: "PopoverOverlay" });
  };
} });
let d0 = fe({ name: "PopoverPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, focus: { type: Boolean, default: !1 }, id: { type: String, default: () => `headlessui-popover-panel-${qr()}` } }, inheritAttrs: !1, setup(n, { attrs: e, slots: t, expose: r }) {
  let { focus: o } = n, s = aa("PopoverPanel"), i = le(() => Mn(s.panel)), a = `headlessui-focus-sentinel-before-${qr()}`, l = `headlessui-focus-sentinel-after-${qr()}`;
  r({ el: s.panel, $el: s.panel }), Et(() => {
    s.panelId.value = n.id;
  }), Qn(() => {
    s.panelId.value = null;
  }), tn(c0, s.panelId), He(() => {
    var g, b;
    if (!o || s.popoverState.value !== 0 || !s.panel)
      return;
    let v = (g = i.value) == null ? void 0 : g.activeElement;
    (b = W(s.panel)) != null && b.contains(v) || Vn(W(s.panel), Xt.First);
  });
  let c = e0(), u = le(() => c !== null ? (c.value & fr.Open) === fr.Open : s.popoverState.value === 0);
  function d(g) {
    var b, v;
    switch (g.key) {
      case hn.Escape:
        if (s.popoverState.value !== 0 || !W(s.panel) || i.value && !((b = W(s.panel)) != null && b.contains(i.value.activeElement)))
          return;
        g.preventDefault(), g.stopPropagation(), s.closePopover(), (v = W(s.button)) == null || v.focus();
        break;
    }
  }
  function f(g) {
    var b, v, x, y, w;
    let k = g.relatedTarget;
    k && W(s.panel) && ((b = W(s.panel)) != null && b.contains(k) || (s.closePopover(), ((x = (v = W(s.beforePanelSentinel)) == null ? void 0 : v.contains) != null && x.call(v, k) || (w = (y = W(s.afterPanelSentinel)) == null ? void 0 : y.contains) != null && w.call(y, k)) && k.focus({ preventScroll: !0 })));
  }
  let p = r0();
  function h() {
    let g = W(s.panel);
    if (!g)
      return;
    function b() {
      rn(p.value, { [Qt.Forwards]: () => {
        var v;
        Vn(g, Xt.First) === Ai.Error && ((v = W(s.afterPanelSentinel)) == null || v.focus());
      }, [Qt.Backwards]: () => {
        var v;
        (v = W(s.button)) == null || v.focus({ preventScroll: !0 });
      } });
    }
    b();
  }
  function m() {
    let g = W(s.panel);
    if (!g)
      return;
    function b() {
      rn(p.value, { [Qt.Forwards]: () => {
        let v = W(s.button), x = W(s.panel);
        if (!v)
          return;
        let y = ia(), w = y.indexOf(v), k = y.slice(0, w + 1), S = [...y.slice(w + 1), ...k];
        for (let E of S.slice())
          if (E.dataset.headlessuiFocusGuard === "true" || x != null && x.contains(E)) {
            let T = S.indexOf(E);
            T !== -1 && S.splice(T, 1);
          }
        Vn(S, Xt.First, { sorted: !1 });
      }, [Qt.Backwards]: () => {
        var v;
        Vn(g, Xt.Previous) === Ai.Error && ((v = W(s.button)) == null || v.focus());
      } });
    }
    b();
  }
  return () => {
    let g = { open: s.popoverState.value === 0, close: s.close }, { id: b, focus: v, ...x } = n, y = { ref: s.panel, id: b, onKeydown: d, onFocusout: o && s.popoverState.value === 0 ? f : void 0, tabIndex: -1 };
    return on({ ourProps: y, theirProps: { ...e, ...x }, attrs: e, slot: g, slots: { ...t, default: (...w) => {
      var k;
      return [he(je, [u.value && s.isPortalled.value && he(Wo, { id: a, ref: s.beforePanelSentinel, features: Yr.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: h }), (k = t.default) == null ? void 0 : k.call(t, ...w), u.value && s.isPortalled.value && he(Wo, { id: l, ref: s.afterPanelSentinel, features: Yr.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: m })])];
    } }, features: Uo.RenderStrategy | Uo.Static, visible: u.value, name: "PopoverPanel" });
  };
} });
fe({ name: "PopoverGroup", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" } }, setup(n, { attrs: e, slots: t, expose: r }) {
  let o = H(null), s = pc([]), i = le(() => Mn(o)), a = Oce();
  r({ el: o, $el: o });
  function l(f) {
    let p = s.value.indexOf(f);
    p !== -1 && s.value.splice(p, 1);
  }
  function c(f) {
    return s.value.push(f), () => {
      l(f);
    };
  }
  function u() {
    var f;
    let p = i.value;
    if (!p)
      return !1;
    let h = p.activeElement;
    return (f = W(o)) != null && f.contains(h) ? !0 : s.value.some((m) => {
      var g, b;
      return ((g = p.getElementById(m.buttonId.value)) == null ? void 0 : g.contains(h)) || ((b = p.getElementById(m.panelId.value)) == null ? void 0 : b.contains(h));
    });
  }
  function d(f) {
    for (let p of s.value)
      p.buttonId.value !== f && p.close();
  }
  return tn(a0, { registerPopover: c, unregisterPopover: l, isFocusWithinPopoverGroup: u, closeOthers: d, mainTreeNodeRef: a.mainTreeNodeRef }), () => he(je, [on({ ourProps: { ref: o }, theirProps: { ...n, ...e }, slot: {}, attrs: e, slots: t, name: "PopoverGroup" }), he(a.MainTreeNode)]);
} });
const _ce = { class: "relative" }, Nce = ["onClick"], Rce = { class: "flex items-center space-x-2" }, Lce = { class: "p-1 border rounded-sm border-stone-200" }, Pce = /* @__PURE__ */ fe({
  __name: "NodeSelector",
  props: {
    editor: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = [
      {
        name: "Text",
        icon: Eg,
        command: () => e.editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
        isActive: () => e.editor.isActive("paragraph") && !e.editor.isActive("bulletList") && !e.editor.isActive("orderedList")
      },
      {
        name: "Heading 1",
        icon: xg,
        command: () => e.editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => e.editor.isActive("heading", { level: 1 })
      },
      {
        name: "Heading 2",
        icon: wg,
        command: () => e.editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => e.editor.isActive("heading", { level: 2 })
      },
      {
        name: "Heading 3",
        icon: Sg,
        command: () => e.editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => e.editor.isActive("heading", { level: 3 })
      },
      {
        name: "To-do List",
        icon: vg,
        command: () => e.editor.chain().focus().toggleTaskList().run(),
        isActive: () => e.editor.isActive("taskItem")
      },
      {
        name: "Bullet List",
        icon: Ql,
        command: () => e.editor.chain().focus().toggleBulletList().run(),
        isActive: () => e.editor.isActive("bulletList")
      },
      {
        name: "Numbered List",
        icon: Ql,
        command: () => e.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => e.editor.isActive("orderedList")
      },
      {
        name: "Quote",
        icon: Cg,
        command: () => e.editor.chain().focus().toggleNode("paragraph", "paragraph").toggleBlockquote().run(),
        isActive: () => e.editor.isActive("blockquote")
      },
      {
        name: "Code",
        icon: mu,
        command: () => e.editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => e.editor.isActive("codeBlock")
      }
    ], r = le(
      () => t.filter((o) => o.isActive()).pop() ?? {
        name: "Multiple"
      }
    );
    return (o, s) => (V(), Te(ue(Cu), null, {
      default: Un(() => [
        J("div", _ce, [
          Ye(ue(u0), { class: "flex items-center gap-1 p-2 text-sm font-medium whitespace-nowrap text-stone-600 hover:bg-stone-100 active:bg-stone-200 focus:outline-none" }, {
            default: Un(() => {
              var i;
              return [
                J("span", null, xt((i = r.value) == null ? void 0 : i.name), 1),
                Ye(ue(kg), { class: "w-4 h-4" })
              ];
            }),
            _: 1
          }),
          Ye(ue(d0), {
            align: "start",
            class: "z-[99999] absolute my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
          }, {
            default: Un(({ close: i }) => [
              (V(), re(je, null, tr(t, (a, l) => J("button", {
                key: l,
                class: "flex items-center justify-between px-2 py-1 text-sm rounded-sm text-stone-600 hover:bg-stone-100",
                type: "button",
                onClick: () => {
                  a.command(), i();
                }
              }, [
                J("div", Rce, [
                  J("div", Lce, [
                    (V(), Te(Mi(a.icon), { class: "w-3 h-3" }))
                  ]),
                  J("span", null, xt(a.name), 1)
                ]),
                r.value.name === a.name ? (V(), Te(ue(xi), {
                  key: 0,
                  class: "w-4 h-4"
                })) : Ge("", !0)
              ], 8, Nce)), 64))
            ]),
            _: 1
          })
        ])
      ]),
      _: 1
    }));
  }
}), Ice = { class: "relative" }, Bce = /* @__PURE__ */ J("p", { class: "text-base" }, "↗", -1), Fce = ["onSubmit"], qce = ["defaultValue"], zce = {
  key: 1,
  class: "flex items-center p-1 transition-all rounded-sm text-stone-600 hover:bg-stone-100"
}, $ce = /* @__PURE__ */ fe({
  __name: "LinkSelector",
  props: {
    editor: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = H(!1), t = H(null);
    function r(o) {
      console.log(o);
    }
    return (o, s) => (V(), re("div", Ice, [
      J("button", {
        type: "button",
        class: "flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200",
        onClick: s[0] || (s[0] = (i) => e.value = !e.value)
      }, [
        Bce,
        J("p", {
          class: er(["underline decoration-stone-400 underline-offset-4", {
            "text-blue-500": n.editor.isActive("link")
          }])
        }, " Link ", 2)
      ]),
      e.value ? (V(), re("form", {
        key: 0,
        onSubmit: A0(r, ["prevent"]),
        class: "fixed top-full z-[99999] mt-1 flex w-60 overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
      }, [
        J("input", {
          ref_key: "inputRef",
          ref: t,
          type: "text",
          placeholder: "Paste a link",
          class: "flex-1 p-1 text-sm bg-white outline-none",
          defaultValue: n.editor.getAttributes("link").href || ""
        }, null, 8, qce),
        n.editor.getAttributes("link").href ? (V(), re("button", {
          key: 0,
          type: "button",
          class: "flex items-center p-1 text-red-600 transition-all rounded-sm hover:bg-red-100 dark:hover:bg-red-800",
          onClick: s[1] || (s[1] = () => {
            n.editor.chain().focus().unsetLink().run(), e.value = !1;
          })
        }, [
          Ye(ue(oie), { class: "w-4 h-4" })
        ])) : (V(), re("button", zce, [
          Ye(ue(xi), { class: "w-4 h-4" })
        ]))
      ], 40, Fce)) : Ge("", !0)
    ]));
  }
}), Hce = { class: "relative" }, jce = /* @__PURE__ */ J("div", { class: "px-2 my-1 text-sm text-stone-500" }, "Color", -1), Vce = ["onClick"], Uce = { class: "flex items-center space-x-2" }, Wce = /* @__PURE__ */ J("div", { class: "px-2 mt-2 mb-1 text-sm text-stone-500" }, "Background", -1), Kce = ["onClick"], Jce = { class: "flex items-center space-x-2" }, Gce = /* @__PURE__ */ fe({
  __name: "ColorSelector",
  props: {
    editor: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = [
      {
        name: "Default",
        color: "var(--novel-black)"
      },
      {
        name: "Purple",
        color: "#9333EA"
      },
      {
        name: "Red",
        color: "#E00000"
      },
      {
        name: "Yellow",
        color: "#EAB308"
      },
      {
        name: "Blue",
        color: "#2563EB"
      },
      {
        name: "Green",
        color: "#008A00"
      },
      {
        name: "Orange",
        color: "#FFA500"
      },
      {
        name: "Pink",
        color: "#BA4081"
      },
      {
        name: "Gray",
        color: "#A8A29E"
      }
    ], r = [
      {
        name: "Default",
        color: "var(--novel-highlight-default)"
      },
      {
        name: "Purple",
        color: "var(--novel-highlight-purple)"
      },
      {
        name: "Red",
        color: "var(--novel-highlight-red)"
      },
      {
        name: "Yellow",
        color: "var(--novel-highlight-yellow)"
      },
      {
        name: "Blue",
        color: "var(--novel-highlight-blue)"
      },
      {
        name: "Green",
        color: "var(--novel-highlight-green)"
      },
      {
        name: "Orange",
        color: "var(--novel-highlight-orange)"
      },
      {
        name: "Pink",
        color: "var(--novel-highlight-pink)"
      },
      {
        name: "Gray",
        color: "var(--novel-highlight-gray)"
      }
    ], o = le(
      () => t.find(({ color: i }) => e.editor.isActive("textStyle", { color: i }))
    ), s = le(
      () => r.find(
        ({ color: i }) => e.editor.isActive("highlight", { color: i })
      )
    );
    return (i, a) => (V(), Te(ue(Cu), null, {
      default: Un(() => [
        J("div", Hce, [
          Ye(ue(u0), { class: "flex items-center h-full gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200 focus:outline-none" }, {
            default: Un(() => {
              var l, c;
              return [
                J("span", {
                  class: "px-1 rounded-sm",
                  style: Rr({
                    color: (l = o.value) == null ? void 0 : l.color,
                    backgroundColor: (c = s.value) == null ? void 0 : c.color
                  })
                }, " A ", 4),
                Ye(ue(kg), { class: "w-4 h-4" })
              ];
            }),
            _: 1
          }),
          Ye(ue(d0), {
            align: "start",
            class: "z-[99999] absolute my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
          }, {
            default: Un(({ close: l }) => [
              jce,
              (V(), re(je, null, tr(t, (c, u) => J("button", {
                key: u,
                class: "flex items-center justify-between px-2 py-1 text-sm rounded-sm text-stone-600 hover:bg-stone-100",
                type: "button",
                onClick: () => {
                  n.editor.commands.unsetColor(), c.name !== "Default" && n.editor.chain().focus().setColor(c.color || "").run(), l();
                }
              }, [
                J("div", Uce, [
                  J("div", {
                    class: "px-1 py-px font-medium border rounded-sm border-stone-200",
                    style: Rr({ color: c.color })
                  }, " A ", 4),
                  J("span", null, xt(c.name), 1)
                ]),
                n.editor.isActive("textStyle", { color: c.color }) ? (V(), Te(ue(xi), {
                  key: 0,
                  class: "w-4 h-4"
                })) : Ge("", !0)
              ], 8, Vce)), 64)),
              Wce,
              (V(), re(je, null, tr(r, (c, u) => J("button", {
                key: u,
                onClick: () => {
                  n.editor.commands.unsetHighlight(), c.name !== "Default" && n.editor.commands.setHighlight({ color: c.color }), l();
                },
                class: "flex items-center justify-between px-2 py-1 text-sm rounded-sm text-stone-600 hover:bg-stone-100",
                type: "button"
              }, [
                J("div", Jce, [
                  J("div", {
                    class: "px-1 py-px font-medium border rounded-sm border-stone-200",
                    style: Rr({ backgroundColor: c.color })
                  }, " A ", 4),
                  J("span", null, xt(c.name), 1)
                ]),
                n.editor.isActive("highlight", { color: c.color }) ? (V(), Te(ue(xi), {
                  key: 0,
                  class: "w-4 h-4"
                })) : Ge("", !0)
              ], 8, Kce)), 64))
            ]),
            _: 1
          })
        ])
      ]),
      _: 1
    }));
  }
}), Zce = { class: "flex" }, Yce = ["onClick"], Xce = /* @__PURE__ */ fe({
  __name: "index",
  props: {
    editor: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = [
      {
        name: "bold",
        isActive: () => e.editor.isActive("bold"),
        command: () => e.editor.chain().focus().toggleBold().run(),
        icon: Yse
      },
      {
        name: "italic",
        isActive: () => e.editor.isActive("italic"),
        command: () => e.editor.chain().focus().toggleItalic().run(),
        icon: Qse
      },
      {
        name: "underline",
        isActive: () => e.editor.isActive("underline"),
        command: () => e.editor.chain().focus().toggleUnderline().run(),
        icon: sie
      },
      {
        name: "strike",
        isActive: () => e.editor.isActive("strike"),
        command: () => e.editor.chain().focus().toggleStrike().run(),
        icon: rie
      },
      {
        name: "code",
        isActive: () => e.editor.isActive("code"),
        command: () => e.editor.chain().focus().toggleCode().run(),
        icon: mu
      }
    ];
    return (r, o) => (V(), Te(ue(Xx), {
      editor: n.editor,
      class: "flex bg-white border divide-x rounded shadow-xl w-fit divide-stone-200 border-stone-200"
    }, {
      default: Un(() => [
        J("div", Zce, [
          Ye(Pce, { editor: n.editor }, null, 8, ["editor"]),
          Ye($ce, { editor: n.editor }, null, 8, ["editor"]),
          (V(), re(je, null, tr(t, (s, i) => J("button", {
            key: i,
            onClick: (a) => s.command(),
            class: "p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200",
            type: "button"
          }, [
            (V(), Te(Mi(s.icon), {
              class: er(["w-4 h-4", {
                "text-blue-500": s.isActive()
              }])
            }, null, 8, ["class"]))
          ], 8, Yce)), 64)),
          Ye(Gce, { editor: n.editor }, null, 8, ["editor"])
        ])
      ]),
      _: 1
    }, 8, ["editor"]));
  }
}), oue = /* @__PURE__ */ fe({
  __name: "Editor",
  props: {
    /**
     * The API route to use for the Vercel Blob.
     * Defaults to "/api/upload".
     */
    blobApi: {
      type: String,
      default: "/api/upload"
    },
    /**
     * The API route to use for the OpenAI completion API.
     * Defaults to "/api/generate".
     */
    completionApi: {
      type: String,
      default: "/api/generate"
    },
    /**
     * Additional headers to pass to the OpenAI completion API.
     * Defaults to {}.
     */
    apiHeaders: {
      type: Object,
      default: {}
    },
    /**
     * Additional classes to add to the editor container.
     * Defaults to "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg".
     */
    className: {
      type: String,
      default: "relative min-h-[500px] w-full mx-auto max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
    },
    /**
     * The default value to use for the editor.
     * Defaults to defaultEditorContent.
     */
    defaultValue: {
      type: Object,
      default: () => _w
    },
    /**
     * A list of extensions to use for the editor, in addition to the default Novel extensions.
     * Defaults to [].
     */
    extensions: {
      type: Array,
      default: []
    },
    /**
     * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
     * Defaults to {}.
     */
    editorProps: {
      type: Object,
      default: {}
    },
    /**
     * A callback function that is called whenever the editor is updated.
     * Defaults to () => {}.
     */
    onUpdate: {
      type: Function,
      default: () => {
      }
    },
    /**
     * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
     * Defaults to () => {}.
     */
    onDebouncedUpdate: {
      type: Function,
      default: () => {
      }
    },
    /**
     * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
     * Defaults to 750.
     */
    debounceDuration: {
      type: Number,
      default: 750
    },
    /**
     * The key to use for storing the editor's value in local storage.
     * Defaults to "novel__content".
     */
    storageKey: {
      type: String,
      default: "novel__content"
    }
  },
  setup(n, { expose: e }) {
    const t = n;
    tn("completionApi", t.completionApi), tn("apiHeaders", t.apiHeaders), ql("blobApi", t.blobApi);
    const r = ql(t.storageKey, t.defaultValue), o = cw(({ editor: h }) => {
      const m = h.getJSON();
      r.value = m, t.onDebouncedUpdate(h);
    }, t.debounceDuration), { complete: s, completion: i, isLoading: a, stop: l, setCompletion: c } = Dm({
      id: "novel-vue",
      api: t.completionApi,
      headers: t.apiHeaders,
      onFinish: (h, m) => {
        var g;
        (g = u.value) == null || g.commands.setTextSelection({
          from: u.value.state.selection.from - m.length,
          to: u.value.state.selection.from
        });
      },
      onError: (h) => {
        console.error(h);
      }
    }), u = tw({
      extensions: [...sce, ...t.extensions],
      editorProps: {
        ...ice,
        ...t.editorProps
      },
      onUpdate: (h) => {
        const m = h.editor.state.selection;
        ec(h.editor, {
          chars: 2
        }) === "++" && !a.value ? (h.editor.commands.deleteRange({
          from: m.from - 2,
          to: m.from
        }), Zg(ec(h.editor, {
          chars: 5e3
        }), {
          ...t.apiHeaders
        }, t.completionApi).then((b) => {
          c(b);
        })) : (t.onUpdate(h.editor), o(h));
      },
      autofocus: "end"
    });
    e({
      editor: u
    }), Xn(
      () => i.value,
      (h, m) => {
        var b;
        const g = h == null ? void 0 : h.slice(m == null ? void 0 : m.length);
        g && ((b = u.value) == null || b.commands.insertContent(g));
      }
    );
    const d = (h) => {
      var m, g;
      (h.key === "Escape" || h.metaKey && h.key === "z") && (l(), h.key === "Escape" && ((m = u.value) == null || m.commands.deleteRange({
        from: u.value.state.selection.from - i.value.length,
        to: u.value.state.selection.from
      })), (g = u.value) == null || g.commands.insertContent("++"));
    }, f = (h) => {
      var m;
      h.preventDefault(), h.stopPropagation(), l(), window.confirm("AI writing paused. Continue?") && s(((m = u.value) == null ? void 0 : m.getText()) || "");
    };
    Xn(
      () => a.value,
      (h) => {
        h ? (document.addEventListener("keydown", d), window.addEventListener("mousedown", f)) : (document.removeEventListener("keydown", d), window.removeEventListener("mousedown", f));
      }
    );
    const p = H(!1);
    return He(() => {
      u.value && r.value && !p.value && (u.value.commands.setContent(r.value), p.value = !0);
    }), (h, m) => (V(), re(je, null, [
      J("div", {
        onClick: m[0] || (m[0] = (g) => {
          var b;
          return (b = ue(u)) == null ? void 0 : b.chain().focus().run();
        }),
        class: er(n.className)
      }, [
        ue(u) ? (V(), Te(Xce, {
          key: 0,
          editor: ue(u)
        }, null, 8, ["editor"])) : Ge("", !0),
        Ye(ue(ew), { editor: ue(u) }, null, 8, ["editor"])
      ], 2),
      Ye(ue(Gle))
    ], 64));
  }
});
export {
  oue as Editor
};
