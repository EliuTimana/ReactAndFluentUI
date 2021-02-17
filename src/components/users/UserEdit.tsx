import { IconButton, Modal, PrimaryButton, ProgressIndicator, Stack, TextField } from '@fluentui/react';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { UsersService } from '../../services/UsersService';
import * as yup from 'yup';
import { User } from '../../models';

/*interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  userId: number;
}*/

interface Props {
  userId: number | null;

  onClose(): void;
}

export const UserEdit = ({userId, onClose}: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const formikRef = useRef<any>();

  const fetchUser = async () => {
    setLoading(true);
    if (userId) {
      const data = await UsersService.getUser(userId);
      setUser(data);
      if (formikRef.current) {
        formikRef.current?.setFieldValue('name', data?.name)
        formikRef.current?.setFieldValue('email', data?.email)
        formikRef.current?.setFieldValue('website', data?.website)
        formikRef.current?.setFieldValue('phone', data?.phone)
      }
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }

  const saveUser = async (formData: User) => {
    try {
      if (!userId) {
        await UsersService.saveUser({...formData});
      } else {
        await UsersService.updateUser({...formData, id: userId});
      }
      setVisible(false);
      onClose();
    } catch (e) {

    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    website: yup.string().required().url(),
    phone: yup.string().required(),
  })

  return <div>
    <Modal isOpen={visible} scrollableContentClassName="overflow-visible">
      <div className="d-flex justify-content-between p-3">
        <span className="ms-font-xl-plus">{userId === null ? 'Create User' : 'Edit User'}</span>
        <IconButton iconProps={{iconName: 'Cancel'}} onClick={() => onClose()} disabled={loading}/>
      </div>
      <div className="p-3">
        <Formik innerRef={formikRef}
                initialValues={{
                  name: '',
                  email: '',
                  website: '',
                  phone: '',
                }}
                validationSchema={schema}
                onSubmit={
                  async (values, {setSubmitting}) => {
                    await saveUser(values as User);
                    setSubmitting(false);
                  }
                }>
          {
            ({isSubmitting, errors}) => (
                <Form noValidate>
                  {(loading || isSubmitting) && <ProgressIndicator/>}
                  <Stack tokens={{childrenGap: 15}}>
                    <Field disabled={isSubmitting || loading} name="name" label="Name" required errorMessage={errors.name} as={TextField}/>
                    <Field disabled={isSubmitting || loading} name="email" label="Email" required type="email" errorMessage={errors.email}
                           as={TextField}/>
                    <Field disabled={isSubmitting || loading} name="website" label="Website" required type="url" errorMessage={errors.website}
                           as={TextField}/>
                    <Field disabled={isSubmitting || loading} name="phone" label="Phone" required type="text" errorMessage={errors.phone}
                           as={TextField}/>
                    <PrimaryButton text="Save" type="submit" disabled={isSubmitting || loading}/>
                  </Stack>
                </Form>
            )
          }
        </Formik>
      </div>
    </Modal>
  </div>;

}
