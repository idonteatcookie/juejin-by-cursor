export const fetchCategoryBriefs = async () => {
  // 在实际项目中这里会是真实的API调用
  const response = await fetch('/mock/query_category_briefs.json');
  return response.json();
}; 