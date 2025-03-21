export const fetchCategoryBriefs = async () => {
  // 在实际项目中这里会是真实的API调用
  const response = await fetch('/mock/query_category_briefs.json');
  return response.json();
};

export const fetchArticleList = async (page: number = 1) => {
  // 添加1秒延时
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const response = await fetch('/mock/recommend_all_feed.json');
  const data = await response.json();
  return data;
};

export const fetchArticleRank = async () => {
  const response = await fetch('/mock/article_rank.json');
  const data = await response.json();
  return data;
};

export const fetchQualityAuthors = async () => {
  const response = await fetch('/mock/quality_user.json');
  const data = await response.json();
  return data;
};

export const fetchHotTopics = async () => {
  const response = await fetch('/mock/list_by_hot.json');
  const data = await response.json();
  return data;
}; 