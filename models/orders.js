import {pool}  from '../config/index.js'

const fetchExistingOrders = async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT Orders.orderID, Users.userID, Products.prodID, Orders.prodName, Orders.price, Orders.orderDate, Orders.prodImage
          FROM Orders
          INNER JOIN
          Users ON Orders.userID = Users.userID
          INNER JOIN
          Products on Orders.prodID = Products.prodID;
      `);

      const orders = result.rows;

      res.status(200).json({ orders });
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
  }
}

const fetchExistingOrder = async (orderId) => { 
  const query = `
      SELECT Orders.orderID, Users.userID, Products.prodID, Orders.prodName, Orders.price, Orders.orderDate, Orders.prodImage
      FROM Orders
      INNER JOIN Users ON Orders.userID = Users.userID
      INNER JOIN Products ON Orders.prodID = Products.prodID
      WHERE orderID = ?;
  `;
  try {
      const results = await pool.query(query, [orderId]); 
      if (results.length > 0) {
          return { success: true, order: results[0] }; 
      } else {
          return { success: false, message: "Order not found" };
      }
  } catch (err) {
      throw err;
  }
}



  const insertNewOrder = async (req, res) => {
    const { orderID, userID, prodID } = req.params;
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const result = `
        INSERT INTO Orders VALUES(?, ?, ?, ?)
        `;
    try {
      await pool.query(result, [orderID, userID, prodID, currentDate]);
      res.json({
        status: res.statusCode,
        msg: "Order added successfully",
      });
    } catch (err) {
      throw err;
    }
  }

 const updateExistingOrder = async (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const result = `
        UPDATE Orders SET orderDate = ?
    `;
    try {
      await pool.query(result, [currentDate]);
      res.json({
        status: res.statusCode,
        msg: "Order date updated successfully",
      });
    } catch (err) {
      throw err;
    }
  }

  const removeExistingOrder  = async (req, res) => {
    const result = `
        DELETE FROM Orders WHERE orderID = ?
    `;
    try {
      await pool.query(result, [req.params.orderID]);
      res.json({
        status: res.statusCode,
        msg: "Order deleted successfully!",
      });
    } catch (err) {
      throw err;
    }
  }

export {fetchExistingOrders, fetchExistingOrder, insertNewOrder, updateExistingOrder, removeExistingOrder}
