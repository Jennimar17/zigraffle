import { Box } from '@mui/material';
import axios from 'axios';
import useCurrentUser from 'hooks/useCurrentUser';
import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ErrorMessage, InputText, Typography } from 'zignaly-ui';
import DialogContainer from '../DialogContainer';
import { Form } from './styles';
import { ClaimModalProps } from './types';

const CongratulationsModal = ({ auction, ...props }: ClaimModalProps) => {
  const { t } = useTranslation('claim');

  return (
    <DialogContainer title={t('congratulations')} {...props}>
      <Typography color='neutral200'>{t('claim-success')}</Typography>
      <Box
        gap='12px'
        display='flex'
        justifyContent='center'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        mt='94px'
      >
        <Button
          caption={t('close')}
          size='large'
          onClick={(e) => props.onClose(e, 'escapeKeyDown')}
        />
      </Box>
    </DialogContainer>
  );
};

const ClaimModal = ({ auction, ...props }: ClaimModalProps) => {
  const { t } = useTranslation(['claim', 'user-settings', 'global']);
  const {
    user: { discordName, publicAddress, username, id },
  } = useCurrentUser();
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const scriptUrl = process.env.REACT_APP_SHEET_BEST_URL as string;
  const payload = {
    discordName: discordName,
    publicAddress: publicAddress,
    username: username,
    id: id,
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(scriptUrl, payload)
      .then(() => {
        setLoading(false);
        setSuccess(true);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setLoading(false);
      });
  };

  if (success) {
    return <CongratulationsModal auction={auction} {...props} />;
  }

  return (
    <DialogContainer title={t('claim-instructions')} {...props}>
      <Typography color='neutral200'>{t('congratulations-winner')}</Typography>
      <br />
      <br />
      <Typography color='neutral200'>{t('verify')}</Typography>
      <Form onSubmit={submit}>
        <Typography color='neutral200'>{t('connected-wallet')}</Typography>
        <InputText
          name='publicAddress'
          value={publicAddress}
          placeholder={t('connected-wallet')}
          disabled={true}
          minHeight={1}
        />
        <Typography color='neutral200'>
          {t('discord-user-label', {
            ns: 'user-settings',
          })}
        </Typography>
        <Box mt='-8px'>
          <Typography color='neutral400' variant='h4'>
            {t('change')}
          </Typography>
        </Box>
        <InputText
          name='discordName'
          value={discordName}
          placeholder={t('please-enter-discord-user', {
            ns: 'user-settings',
          })}
          disabled={true}
          minHeight={1}
        />
        <Box
          gap='12px'
          display='flex'
          justifyContent='center'
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
          mt='40px'
        >
          <Button
            caption={t('cancel', {
              ns: 'global',
            })}
            variant='secondary'
            size='large'
            onClick={(e) => props.onClose(e, 'escapeKeyDown')}
            type='button'
          />
          <Button
            type='submit'
            loading={loading}
            caption={t('claim')}
            size='large'
            disabled={!discordName}
          />
        </Box>
        {errorMessage && (
          <Box mt='9px'>
            <ErrorMessage text={errorMessage} />
          </Box>
        )}
      </Form>
    </DialogContainer>
  );
};

export default ClaimModal;
