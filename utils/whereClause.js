/**
 * class except modals to use the operation
 *  /api/v1/product?search=coder&page=2&category=shortsleeves&
 * rating[gte]=4&price[lte]=999&price[gte]=199&limit=5
 */

class WhereClause {
  constructor(base, bigQuery) {
    this.base = base;
    this.bigQuery = bigQuery;
  }
  //methods for operation(search,pagination,rating or category)

  search() {
    const searchword = this.bigQuery.search
      ? {
          name: {
            $regex: this.bigQuery.search,
            $options: "i", //case sensitivity
          },
        }
      : {};

    this.base = this.base.find({ ...searchword });
    return this;
  }

  filterAggregation() {
    const copyQuery = { ...this.bigQuery };
    delete copyQuery["search"];
    delete copyQuery["limit"];
    delete copyQuery["page"];
    //can't user regex in object so doing a string conversion for oerform regex
    let strCopyQuery = JSON.stringify(copyQuery);
    strCopyQuery = strCopyQuery.replace(/\b(gte|lte|gt|lt)\b/g, (m) => `$${m}`);
    let jsonCopyQuery = JSON.parse(strCopyQuery);
    this.base = this.base.find(jsonCopyQuery);
    return this;
  }

  pager(resultPerPage) {
    let currentPage = 1;
    if (this.bigQuery.page) {
      currentPage = this.bigQuery.page;
    }
    const skipval = resultPerPage * (currentPage - 1);
    this.base = this.base.limit(resultPerPage).skip(skipval);
    return this;
  }
}

module.exports = WhereClause;
