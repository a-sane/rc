<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Order;
use AppBundle\Entity\OrderItems;
use Application\Sonata\UserBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->render('shop/index.html.twig', []);
    }

    /**
     * @Route("/item", name="item")
     */
    public function itemAction(Request $request)
    {
        return $this->render('shop/single.html.twig', []);
    }

    /**
     * @Route("/order", name="order")
     */
    public function orderAction(Request $request)
    {
        return $this->render('shop/single.html.twig', []);
    }

    /**
     * @Route("/signin", name="signin")
     */
    public function signinAction(Request $request)
    {
        return $this->render('shop/single.html.twig', []);
    }

    /**
     * @Route("/register", name="register")
     */
    public function registerAction(Request $request)
    {
        return $this->render('shop/single.html.twig', []);
    }

    /**
     * @Route("/place_order", name="order_place")
     * @Method({"POST"})
     */
    public function placeOrderAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);

        $items = $request->get('items', null);
        if (!$items) {
            return new JsonResponse(array('message' => 'Invalid request'), 400);
        }

        $userReq = $request->get('user', null);
        if (!$userReq) {
            return new JsonResponse(array('message' => 'Invalid request'), 400);
        }

        $cloudinary = $this->get('speicher210_cloudinary.uploader');
        $em = $this->getDoctrine()->getManager();

        $order = new Order();

        $userRepo = $em->getRepository('ApplicationSonataUserBundle:User');
        $user = $userRepo->findOneBy(['username' => $userReq['userName']]);

        $order->setUser($user);
        $em->persist($order);

        foreach($items as $item) {
            $orderItem = new OrderItems();
            $orderItem->setOrder($order);
            $orderItem->setName($item['name']);
            $orderItem->setColor($item['color']);
            $orderItem->setPrice($item['price']);
            $orderItem->setLogos(json_encode($item['logos']));
            $orderItem->setTextureUrl($item['texturePath']);

            $uploadedScreenshot = $cloudinary->upload($item['screenshot']);
            $orderItem->setScreenshotUrl($uploadedScreenshot['url']);

            $em->persist($orderItem);
        }


        $em->flush();

        return new JsonResponse(['message' => 'OK'], 200);
    }

    /**
     * @Route("/api/register", name="api_register")
     * @Method({"POST"})
     */
    public function apiRegisterAction(Request $request)
    {
        $username = $request->get('username', null);
        if (!$username) {
            return new JsonResponse(array('message' => 'Invalid request'), 400);
        }

        $password = $request->get('password', null);
        if (!$password) {
            return new JsonResponse(array('message' => 'Invalid request'), 400);
        }

        $firstname = $request->get('firstname', null);
        $lastname = $request->get('lastname', null);
        $country = $request->get('country', null);
        $city = $request->get('city', null);
        $address = $request->get('address', null);

        $em = $this->getDoctrine()->getManager();
        $userRepo = $em->getRepository('ApplicationSonataUserBundle:User');
        $user = $userRepo->findOneBy(['username' => $username]);

        if($user) {
            return new JsonResponse(['statusText' => 'Username already exist'], 400);
        } else {
            $user = new User();
            $user->setUsername($username);
            $user->setEmail($username);
            $user->setFirstname($firstname);
            $user->setLastname($lastname);
            $user->setCountry($country);
            $user->setCity($city);
            $user->setAddress($address);
            $user->setRoles(['ROLE_USER']);
            $user->setEnabled(true);
            $user->setPlainPassword($password);

            $em->persist($user);
            $em->flush();
        }

        return new JsonResponse(['message' => 'OK PUK'], 200);
    }

}
