import groupBy from './groupBy.js'
import transform from './transform.js'

/**
 * Similar to group by it actually calls groupBy internally but it
 * groups by multiple keys. you provide it with multiple iteratees
 * each level of grouping will be sent to each consecutive iteratee
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...Function} iteratees The iteratees to transform keys in order.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * multiGroupBy([{ x: 1, y: 1, z: 1 }, { x: 1, y: 2, z: 1 }, { x: 2, y: 1, z: 1 }, { x: 2, y: 2, z: 1 }, { x: 1, y: 1, z: 2 }, { x: 1, y: 2, z: 2 }, { x: 2, y: 1, z: 2 }, { x: 2, y: 2, z: 2 }], o => o.x, o => o.y)
 * // => { '1': { '1': [{ 'x': 1, 'y': 1, 'z': 1 }, { 'x': 1, 'y': 1, 'z': 2 }], '2': [{ 'x': 1, 'y': 2, 'z': 1 }, { 'x': 1, 'y': 2, 'z': 2 }] }, '2': { '1': [{ 'x': 2, 'y': 1, 'z': 1 }, { 'x': 2, 'y': 1, 'z': 2 }], '2': [{ 'x': 2, 'y': 2, 'z': 1 }, { 'x': 2, 'y': 2, 'z': 2 }] } }
 * multiGroupBy([{ x: 1, y: 1, z: 1 }, { x: 1, y: 2, z: 1 }, { x: 2, y: 1, z: 1 }, { x: 2, y: 2, z: 1 }, { x: 1, y: 1, z: 2 }, { x: 1, y: 2, z: 2 }, { x: 2, y: 1, z: 2 }, { x: 2, y: 2, z: 2 }], 'x', 'y')
 * // => { '1': { '1': [{ 'x': 1, 'y': 1, 'z': 1 }, { 'x': 1, 'y': 1, 'z': 2 }], '2': [{ 'x': 1, 'y': 2, 'z': 1 }, { 'x': 1, 'y': 2, 'z': 2 }] }, '2': { '1': [{ 'x': 2, 'y': 1, 'z': 1 }, { 'x': 2, 'y': 1, 'z': 2 }], '2': [{ 'x': 2, 'y': 2, 'z': 1 }, { 'x': 2, 'y': 2, 'z': 2 }] } }
 */
function multiGroupBy(collection, ...groups) {
  const [group, ...restGroups] = groups; 
  if(!group) {
    return collection
  }
  const currGrouping = groupBy(collection, group)
  if(!restGroups.length) {
    return currGrouping
  }
  return transform(currGrouping, (result, value, key) => {
    result[key] = multiGroupBy(value, ...restGroups)
  }, {})
}

export default multiGroupBy
