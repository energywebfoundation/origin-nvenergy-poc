SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = ON;

SELECT
    pg_catalog.set_config('search_path', '', FALSE);

SET check_function_bodies = FALSE;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = OFF;


/*
 ORGANIZATIONS
 */
INSERT INTO "public"."platform_organization" ("createdAt", "updatedAt", id, name, address, city, "zipCode", country, "businessType", "tradeRegistryCompanyNumber", "vatNumber", "signatoryFullName", "signatoryAddress", "signatoryCity", "signatoryZipCode", "signatoryCountry", "signatoryEmail", "signatoryPhoneNumber", status)
    VALUES ('2020-03-30 09:55:25.962333+02', '2020-03-30 09:55:25.962333+02', 1, 'NVTrec Organization', 'Address', 'City', 'Zip code', 83, 'Issuer', '1000', 'UK1000', 'Issuer signatory', 'Address', 'City', 'Zip code', 83, 'issuer@mailinator.com', 'Phone number', 2);


/*
 USERS
 */
INSERT INTO "public"."user" ("createdAt", "updatedAt", id, title, "firstName", "lastName", email, telephone, PASSWORD, "blockchainAccountAddress", "blockchainAccountSignedMessage", notifications, rights, "organizationId", status, "kycStatus")
    VALUES ('2020-03-30 10:08:33.510625+02', '2020-03-30 10:08:33.652639+02', 1, 'Mr', 'Issuer', 'Surname', 'issuer@mailinator.com', '111-111-111', '$2a$08$R5nXlTeycdggncK6ElVtDehsv3ZUcBfyekPv5uYdt6dS76.rcAB.m', '0x8e59ab4d31ab8f8e0261c08b4a0b2a23a4e2707c', '0xefd75985452918fe686a6d19b6954db3ae592a6fd9935d0b2aca544b9616ed5d6713a66b70e5ea991ba2409282a487cc21dbcbbc5607f10a43a8135612b5eac51b', 'f', '8', '1', '1', '1');

INSERT INTO "public"."user" ("createdAt", "updatedAt", "id", "title", "firstName", "lastName", "email", "telephone", "password", "blockchainAccountAddress", "blockchainAccountSignedMessage", "notifications", "rights", "organizationId", "status", "kycStatus")
    VALUES ('2020-03-30 08:08:33.510625+00', '2020-03-30 08:08:33.652639+00', 5, 'Mr', 'Admin', 'Surname', 'admin@mailinator.com', '111-111-111', '$2a$08$j8LnGtFdbTfKN5F.0InfdO2gxMWXHbrjWvRziCIl0lRj.kxOKJ/b6', '0x7672fa3f8c04abbcbad14d896aad8bedece72d2b', '0xb0a804f410f2934278703eb992e5ba12f9e8b9068b68ff6d1246a56cf52e48677d3648057453d86f4372b2ffd98fa189aee1562d8c564ac62bc416d6cdc474051c', 'f', '16', '1', '1', '1');

INSERT INTO "public"."user" ("createdAt", "updatedAt", "id", "title", "firstName", "lastName", "email", "telephone", "password", "blockchainAccountAddress", "blockchainAccountSignedMessage", "notifications", "rights", "organizationId", "status", "kycStatus")
    VALUES ('2020-03-30 08:08:33.510625+00', '2020-03-30 08:08:33.652639+00', 6, 'Mr', 'Agents', 'Surname', 'agents@mailinator.com', '111-111-111', '$2a$08$j8LnGtFdbTfKN5F.0InfdO2gxMWXHbrjWvRziCIl0lRj.kxOKJ/b6', '0x7672fa3f8c04abbcbad14d896aad8bedece72d2b', '0xb0a804f410f2934278703eb992e5ba12f9e8b9068b68ff6d1246a56cf52e48677d3648057453d86f4372b2ffd98fa189aee1562d8c564ac62bc416d6cdc474051c', 'f', '32', '1', '1', '1');

SELECT
    setval(pg_get_serial_sequence('public.user', 'id'), (
            SELECT
                MAX("id")
            FROM public.user) + 1);

SELECT
    setval(pg_get_serial_sequence('public.platform_organization', 'id'), (
            SELECT
                MAX("id")
            FROM public.platform_organization) + 1);

