import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { resetUser } from "../../../_actions/user_actions";
import {
    Form,
    Input,
    Button,
} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function ResetUserPage(props) {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                newPassword: ''
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('올바른 이메일 형식이 아닙니다.')
                    .required('이메일은 필수입니다.'),
                password: Yup.string()
                    .required('기존 비밀번호는 필수입니다.'),
                newPassword: Yup.string()
                    .min(6, '새로운 비밀번호는 최소 6자리 이상이어야 합니다.')
                    .required('새로운 비밀번호는 필수입니다.'),
            })}

            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        newPassword: values.newPassword
                    };

                    dispatch(resetUser(dataToSubmit)).then(response => {
                        if (response.payload.success) {
                            alert("비밀번호를 성공적으로 변경하였습니다.")
                            props.history.push("/login");
                        } else {
                            alert(response.payload.message)
                        }
                    })
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;

                
                return (
                    <div className="app">
                        <h2>비밀번호 변경</h2>
                        <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

                            <Form.Item required label="이메일" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                                <Input
                                    id="email"
                                    placeholder="이메일을 입력해주세요."
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="기존 비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                                <Input
                                    id="password"
                                    placeholder="기존 비밀번호를 입력해주세요."
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="새로운 비밀번호" hasFeedback>
                                <Input
                                    id="newPassword"
                                    placeholder="새로운 비밀번호를 입력해주세요."
                                    type="password"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.newPassword && touched.newPassword ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.newPassword && touched.newPassword && (
                                    <div className="input-feedback">{errors.newPassword}</div>
                                )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                    변경
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default ResetUserPage