import { FC } from 'react';
import { Spin } from 'antd';
import { ReactChildrenInterface } from '../types';

interface SpinnerWrapperProps extends ReactChildrenInterface {
  loading: boolean;
}

export const Spinner: FC = () => <Spin style={{ margin: 30 }} size="large" />;

export const SpinnerWrapper = ({ children, loading }: SpinnerWrapperProps) => (
  <Spin style={{ margin: 30 }} tip="Loading" size="large" spinning={loading} delay={300}>
    {children}
  </Spin>
);
