import { useEffect } from 'react';
import { usePreferences } from '../context/PreferencesProvider';
import { Button, Form, FormProps, Select, message } from 'antd';
import { Preferences } from '../types';
import { SourceENUM } from '../enum';

function SettingsPage() {
  const { preferences, updatePreferences } = usePreferences();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue(preferences);
  }, [form, preferences]);

  const handleSubmit: FormProps<Preferences>['onFinish'] = (values: Preferences) => {
    updatePreferences(values);
    messageApi.open({
      key: 'success-key',
      type: 'success',
      content: 'Your preferences have been updated!',
      duration: 2,
    });
  };

  return (
    <div>
      {contextHolder}
      <h2>Preferences</h2>
      <Form layout="horizontal" form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} onFinish={handleSubmit}>
        <Form.Item<Preferences> label="Sources" name="sources" extra={Object.values(SourceENUM).join(' | ')}>
          <Select mode="tags" />
        </Form.Item>
        <Form.Item<Preferences> label="Categories" name="categories">
          <Select mode="tags" />
        </Form.Item>
        <Form.Item<Preferences> label="Authors" name="authors">
          <Select mode="tags" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Save Preferences
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SettingsPage;
