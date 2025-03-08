import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchCategoryBriefs } from '../../utils/mock';
import CategoryIcon from '../../components/CategoryIcon';

const SidebarWrapper = styled.div`
  width: 180px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
`;

const MenuItem = styled.div<{ active?: boolean }>`
  position: relative;
  padding: 0 16px;
  height: 46px;
  cursor: pointer;
  color: ${props => props.active ? '#1e80ff' : '#4e5969'};
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  background-color: ${props => props.active ? '#eaf2ff' : 'transparent'};

  &:hover {
    color: #1e80ff;
    background-color: ${props => props.active ? '#eaf2ff' : '#f4f5f5'};
  }
`;

const MenuText = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const RedDot = styled.span`
  position: absolute;
  top: -2px;
  right: -8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #f64242;
`;

interface Category {
  category_id: string;
  category_name: string;
  category_url: string;
}

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeId, setActiveId] = useState('comprehensive'); // 默认选中综合

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategoryBriefs();
        if (response.err_no === 0) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    loadCategories();
  }, []);

  // 固定的菜单项
  const fixedTopItems = [
    { id: 'follow', name: '关注', showDot: true },
    { id: 'comprehensive', name: '综合', showDot: false },
  ];

  // 固定的底部菜单项
  const fixedBottomItems = [
    { id: 'ranking', name: '排行榜', showDot: false },
  ];

  const handleMenuClick = (id: string) => {
    setActiveId(id);
  };

  const renderMenuItem = (id: string, name: string, showDot?: boolean, categoryUrl?: string) => (
    <MenuItem
      key={id}
      active={activeId === id}
      onClick={() => handleMenuClick(id)}
    >
      <CategoryIcon categoryUrl={categoryUrl} categoryId={id} />
      <MenuText>
        {name}
        {showDot && <RedDot />}
      </MenuText>
    </MenuItem>
  );

  return (
    <SidebarWrapper>
      {/* 固定顶部菜单项 */}
      {fixedTopItems.map(item => renderMenuItem(item.id, item.name, item.showDot))}
      
      {/* 动态加载的分类菜单项 */}
      {categories.map(category => 
        renderMenuItem(
          category.category_id, 
          category.category_name, 
          false, 
          category.category_url
        )
      )}

      {/* 固定底部菜单项 */}
      {fixedBottomItems.map(item => renderMenuItem(item.id, item.name))}
    </SidebarWrapper>
  );
};

export default Sidebar; 