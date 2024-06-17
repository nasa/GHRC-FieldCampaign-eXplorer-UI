export const getMin = (array, comparater) => 
  array.reduce((prev, curr) => 
    comparater(curr, prev) === 1  ? prev 
                                  : curr
  )

export const getMax = (array, comparater) => 
  array.reduce((prev, curr) => 
    comparater(curr, prev) === -1   ? prev 
                                    : curr
  )
