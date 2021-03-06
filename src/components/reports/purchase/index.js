import React from 'react';
import { Page, View, Document, StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F7F7F7',
    flexDirection: 'column'
  },
  company: {
    fontSize: 18,
    margin: 10,
    padding: 10,
    title: {
      fontSize: 32
    },
    description: {
      fontSize: 12,
      paddingBottom: 5
    },
    moneyToCompany: {

    }
  },
  driver: {
    paddingLeft: 20,
    name: {
      fontSize: 18
    },
    points: {
      fontSize: 12
    },
    paddingBottom: 5
  },
  transactions: {
    paddingTop: 4,
    paddingLeft: 10,
    title: {
      fontSize: 16
    },
    points: {
      fontSize: 12
    }
  }
});

const Doc = ({ Companies }) => {
  const getMoneyDue = () => {
    let money = 0;

    Companies && Companies.forEach(({ DriverCompanies }) => {
      DriverCompanies && DriverCompanies.forEach(({ Driver: { Transactions } }) => {
        Transactions && Transactions.forEach(({ Product: { price } }) => money += parseFloat(price.substring(1)))
      })
    })

    // 0.01 is the ratio for the tax to use the system
    return (money * 0.01).toFixed(2);
  }
  
  return (
    <Document>
      {
        Companies && Companies.map(({ name, pointToDollarRatio, description, DriverCompanies }) => (
          <Page size="A4" style={styles.page} key={name}>
            <View style={styles.company}>
              <Text style={styles.company.title}>{name}</Text>
              <Text>Point To Dollar: {pointToDollarRatio}</Text>
              <Text>{`Money due to system: $${getMoneyDue()}`}</Text>
              <Text style={styles.company.description}>{description}</Text>
              <Drivers DriverCompanies={DriverCompanies} ratio={pointToDollarRatio} />
            </View>
          </Page>   
        ))
      }
    </Document>
  );
}

const Drivers = ({ DriverCompanies, ratio }) => {
  return DriverCompanies && DriverCompanies.map(({ points, Driver }) => (
    <View key={Driver.User.email} style={styles.driver}>
      <Text style={styles.driver.name}>{Driver.User.email}</Text>
      <Text style={styles.driver.points}>Current points: {points} | Money: ${points * ratio}</Text>
      <Transactions transactions={Driver.Transactions} ratio={ratio} />
    </View>
  ));
}

const Transactions = ({ transactions, ratio }) => {
  return transactions && transactions.map(({ Product: { title, price } }) => (
    <View key={title} style={styles.transactions}>
      <Text style={styles.transactions.title}>{title}</Text>
      <Text style={styles.transactions.points}>Points: {Math.round(parseFloat(price.substring(1)) / ratio).toFixed(0)} | Money: {price}</Text>
    </View>
  ));
}

export default Doc;
