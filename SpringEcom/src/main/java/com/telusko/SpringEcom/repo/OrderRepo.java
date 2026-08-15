package com.telusko.SpringEcom.repo;

import com.telusko.SpringEcom.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Order,Integer> {
 Optional<Order> findByOrderId(String orderId);
}
