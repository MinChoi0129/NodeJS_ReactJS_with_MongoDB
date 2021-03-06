import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
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

function RegisterPage(props) {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                email: '',
                lastName: '',
                name: '',
                password: '',
                confirmPassword: ''
            }}

            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('이름은 필수입니다.'),
                lastName: Yup.string()
                    .required('성은 필수입니다.'),
                email: Yup.string()
                    .email('올바른 이메일 형식이 아닙니다.')
                    .required('이메일은 필수입니다.'),
                password: Yup.string()
                    .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
                    .required('비밀번호는 필수입니다.'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], '비밀번호가 다릅니다.')
                    .required('비밀번호 확인은 필수입니다.')
            })}

            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        lastname: values.lastname,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                    };

                    dispatch(registerUser(dataToSubmit)).then(response => {
                        if (response.payload.success) {
                            props.history.push("/login");
                        } else {
                            if (response.payload.err.errmsg.slice(0, 6) === 'E11000') {
                                alert(`'${dataToSubmit.email}' 은(는) 이미 사용중인 이메일입니다!`)
                            } else {
                                alert(response.payload.err.errmsg)
                            }
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
                        <h2>회원가입</h2>
                        <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >
                            <Form.Item required label="이름">
                                <Input
                                    id="name"
                                    placeholder="성을 제외한 이름을 입력해주세요."
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.name && touched.name ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="성">
                                <Input
                                    id="lastName"
                                    placeholder="성을 입력해주세요."
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.lastName && touched.lastName && (
                                    <div className="input-feedback">{errors.lastName}</div>
                                )}
                            </Form.Item>

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

                            <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                                <Input
                                    id="password"
                                    placeholder="비밀번호를 입력해주세요."
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

                            <Form.Item required label="비밀번호 확인" hasFeedback>
                                <Input
                                    id="confirmPassword"
                                    placeholder="비밀번호를 한 번 더 입력해주세요."
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="input-feedback">{errors.confirmPassword}</div>
                                )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                    가입
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default RegisterPage