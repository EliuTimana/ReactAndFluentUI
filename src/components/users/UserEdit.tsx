import { IconButton, Modal, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { User } from '../../models';
import { UsersService } from '../../services/UsersService';
import * as yup from 'yup';
/*interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  userId: number;
}*/
interface Props {
  userId: number | null;
  visible: boolean;

  onClose(): void;
}

export const UserEdit = ({userId, visible, onClose}: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    if (userId) {
      const data = await UsersService.getUser(userId);
      setUser(data);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const schema = yup.object().shape({
    name:yup.string().required(),
    email:yup.string().required().email(),
    website:yup.string().required().url(),
    phone:yup.string().required(),
  })

  return <div>
    <Modal isOpen={visible} scrollableContentClassName="overflow-visible">
      <div className="d-flex justify-content-between p-3">
        <span className="ms-font-xl-plus">{userId === null ? 'Create User' : 'Edit User'}</span>
        <IconButton iconProps={{iconName: 'Cancel'}} onClick={() => onClose()} disabled={loading}/>
      </div>
      {
        !loading && <div className="p-3">
            <Formik
                initialValues={{
                  name: user?.name,
                  email: user?.email,
                  website: user?.website,
                  phone: user?.phone
                }}
                validationSchema={schema}
                onSubmit={
                  (values, {setSubmitting}) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }
                }>
              {
                ({isSubmitting, errors}) => (
                    <Form noValidate>
                      <Stack tokens={{childrenGap: 15}}>
                        <Field name="name" label="Name" required errorMessage={errors.name} as={TextField}/>
                        <Field name="email" label="Email" required type="email" errorMessage={errors.email} as={TextField}/>
                        <Field name="website" label="Website" required type="url" errorMessage={errors.website} as={TextField}/>
                        <Field name="phone" label="Phone" required type="tel" errorMessage={errors.phone} as={TextField}/>
                        <PrimaryButton text="Save" type="submit" disabled={isSubmitting}/>
                      </Stack>
                    </Form>
                )
              }
            </Formik>
        </div>
      }
    </Modal>
  </div>;

}
