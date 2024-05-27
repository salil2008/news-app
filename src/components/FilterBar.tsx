// src/components/FilterBar.js
import { Button, DatePicker, Form, Input } from 'antd';
import { FC } from 'react';
import { FilterQueryProps } from '../types';
import { SourceENUM } from '../enum';

type Props = {
  onFilter: (query: FilterQueryProps) => void;
};

const FilterBar: FC<Props> = ({ onFilter }) => {
  const [form] = Form.useForm();

  const handleFilterChange = (values: FilterQueryProps) => {
    onFilter(values);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <Form layout="inline" form={form} onFinish={handleFilterChange} style={{ justifyContent: 'center', margin: 10 }}>
        <Form.Item name="search" rules={[{ required: true }]}>
          <Input placeholder="Search News" />
        </Form.Item>
        <Form.Item name="source" extra={Object.values(SourceENUM).join(' | ')}>
          <Input placeholder="Sources" />
        </Form.Item>
        <Form.Item name="category">
          <Input placeholder="Categories" />
        </Form.Item>
        <Form.Item name="from">
          <DatePicker placeholder="From" />
        </Form.Item>
        <Form.Item name="to">
          <DatePicker placeholder="To" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FilterBar;
