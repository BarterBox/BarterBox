import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Heading1({ text }) {
    return (
        <Text style={styles.heading1}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    heading1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    }
})