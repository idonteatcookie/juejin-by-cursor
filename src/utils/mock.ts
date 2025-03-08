export const fetchCategoryBriefs = async () => {
  // 在实际项目中这里会是真实的API调用
  const response = await fetch('/mock/query_category_briefs.json');
  return response.json();
};

export const fetchArticleList = async (page: number = 1) => {
  // 在实际项目中这里会带上分页参数请求服务器
  const response = await fetch('/mock/recommend_all_feed.json');
  const data = await response.json();
  return data;
}; 