import SEO from '../../components/SEO';
import MdxCard from '../../components/MdxCard';
import { CardBody } from 'oah-ui';

<SEO title="Admin features" />

<MdxCard>
<CardBody>

## Introduction

Admin pages for Prisma project db with [`@prisma-tools/admin`](/admin/generator) tool to generate pages and apollo (queries and mutations) hooks and `schema.json` to custom your models

- [Features](#features)
- [Online demo](#online-demo)
- [Download example](#download-example)
- [Install dependencies](#install-dependencies)
- [Ui package used](#ui-package-used)

## Features

- Have settings system to control of your models.
  - Control of models
    - Change model display name in table
    - Select id field to use in db queries
    - Select display field to display when model have relation with another model
    - Have actions Create update delete default for all true
  - Control of fields
    - Change field display name in a table, update and create pages
    - Change field order by a drag and drop to change gi order in a table, update and create pages
    - Update action to add this field in update page
    - Create action to add this field in create page
    - Read, sort and filter to add this option to this field in display table
- Every model has a page contain pagination table.
  - Table has many page size option
  - Table has go to page number input
  - Table has select page number.
  - If field value bigger than column width will hide it and show all of it in a popover when you click on it
  - you can filter by many fields in same time and in relation fields you can select any field in this relation to filter by it.
  - When you click in any relation field will go to his page with a filter.
- Edit record page.
  - Has a form to edit model fields.
  - Relation fields has a search icon to search in relation records and connect. has close icon to delete relation if field not required.
  - Tabs card has a table with list relation records.
    - You can add a new record to parent record you edit.
- Add new record modal.
  - Has a form to add model fields.
  - Relation fields has a search icon to search in relation records and connect. has close icon to delete relation if field not required.

## Online demo

[https://prisma-admin.ahmedelywa.com/](https://prisma-admin.ahmedelywa.com/)

For online version you need to signup new account then login

## Download example

```shell
git clone https://github.com/AhmedElywa/prisma-admin.git
```

## Install dependencies

```shell
cd prisma-admin
yarn
```

Start service

```shell
yarn dev
```

After change your `schema.prisma`

```shell
yarn generate
yarn dev
```

Navigate to [http://localhost:8000](http://localhost:8000/) in your browser to explore admin pages

### Ui package used

This admin ui template built on [oah-ui](http://oah-ui.ahmedelywa.com/getting-started)

</CardBody>
</MdxCard>
