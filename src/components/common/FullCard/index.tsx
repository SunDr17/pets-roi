import React, { useState, memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import { Item } from '@/types/ItemType';
import { isSvg } from '@/utils/image';
import FilledSvg from '@/components/common/FilledSvg';
import TopUpModalButton from '@/components/pages/Home/TopUpModalButton';
import useBuyItem from './hooks/useBuyItem';

function FullCard({ item }: { item: Item }) {
  const { t } = useTranslation();
  const [error, setError] = useState<React.ReactNode>('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState(item.color || item.defaultColor);

  const isItemImageSvg = isSvg(item.imageSrc);
  const buyItem = useBuyItem();

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const saveItem: Item = {
      ...item,
      fullName: name,
      gender,
      color,
    }

    try {
      buyItem(saveItem);
    } catch (error: any) {
      if (error.message === 'insufficient_balance') {
        setError(
          <Trans
            i18nKey="fullCard.error.insufficient_balance.text"
            components={{
              topUpLink: <TopUpModalButton
                className="link-primary"
                text={t('fullCard.error.insufficient_balance.top_up')}
              />,
            }}
          />
        );
      } else {
        setError(error.message);
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col xs="12" sm="6" md="6" lg="4">
          <Form className="m-auto w-auto" onSubmit={onFormSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="itemName">
              <Form.Label column sm="3">
                {t('fullCard.form.name')}
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  required
                  plaintext
                  placeholder={t('fullCard.form.name')}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="itemGender">
              <Form.Label column sm="3">
                {t('fullCard.form.gender.label')}
              </Form.Label>
              <Col sm="9">
                <Form.Select className="w-auto" onChange={(e) => setGender(e.target.value)}>
                  <option value="male">{t('fullCard.form.gender.male')}</option>
                  <option value="female">{t('fullCard.form.gender.female')}</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="itemPrice">
              <Form.Label column sm="3">
                {t('fullCard.form.price')}
              </Form.Label>
              <Col sm="9">
                <Form.Control plaintext readOnly defaultValue={`${item.price} ${t('currency')}`} />
              </Col>
            </Form.Group>
            {isItemImageSvg && <Form.Group as={Row} className="mb-3" controlId="itemColor">
              <Form.Label column sm="3">
                {t('fullCard.form.color')}
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="color"
                  defaultValue={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>}
            <Button variant="primary" type="submit" className="mb-4">
              {t('fullCard.form.buy')}
            </Button>
            {error && <div className="text-danger mb-4">{error}</div>}
          </Form>
        </Col>
        <Col xs="12" sm="6" md="6" lg="4" className="ml-5">
          {isItemImageSvg
            ? <FilledSvg src={item.imageSrc} color={color!} />
            : <Image src={item.imageSrc} fluid />
          }
        </Col>
      </Row>
    </Container>
  );
}

export default memo(FullCard);
