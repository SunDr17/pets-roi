import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import { getItemById } from '@/services/data/getData';
import NotFound from '@/components/pages/NotFound';

export default function FullCard() {
  const { t } = useTranslation();
  const { id } = useParams();
  const item = getItemById(Number(id));

  return item ? (
    <Container>
      <Row>
        <Col sm="6">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="itemName">
              <Form.Label column sm="2">
                {t('fullCard.form.name')}
              </Form.Label>
              <Col sm="10">
                <Form.Control required plaintext placeholder={t('fullCard.form.name')} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="itemGender">
              <Form.Label column sm="2">
                {t('fullCard.form.gender.label')}
              </Form.Label>
              <Col sm="10">
                <Form.Select>
                  <option value="male">{t('fullCard.form.gender.male')}</option>
                  <option value="female">{t('fullCard.form.gender.female')}</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="itemPrice">
              <Form.Label column sm="2">
                {t('fullCard.form.price')}
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={`${item.price} ${t('currency')}`} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="itemColor">
              <Form.Label column sm="2">
                {t('fullCard.form.color')}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="color"
                  defaultValue="#563d7c"
                />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              {t('fullCard.form.buy')}
            </Button>
          </Form>
        </Col>
        <Col className="ml-5">
          {item.imageSrc && <Image src={item.imageSrc} fluid />}
        </Col>
      </Row>
    </Container>
  ) : <NotFound />;
}
