import { getAllItems } from './ItemsUtil';
import { flatDeep } from '../utils/flatDeep';

export const getBlogCategories = () => {
    const blogs = getAllItems('blogs');

    const categories = flatDeep(blogs.map((blog) => blog.category));

    return [...new Set(categories)];
};
